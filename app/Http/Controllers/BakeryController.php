<?php

namespace App\Http\Controllers;

use App\Models\Bakery;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BakeryController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Bakery::query()
            ->with([
                'owner:id,name',
                'manager:id,name',
                'storekeeper:id,name',
                'doughMixer:id,name',
                'baker:id,name',
                'helper:id,name',
                'cleaner:id,name',
                'gatekeeper:id,name',
            ]);

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
        }

        if ($user->hasRole('Super Admin')) {
            $bakeries = $query->paginate(10)->withQueryString();
        } else {
            $bakeries = $query->where(function ($q) use ($user) {
                $q->where('owner_id', $user->id)
                  ->orWhere('manager_id', $user->id)
                  ->orWhere('storekeeper_id', $user->id)
                  ->orWhere('dough_mixer_id', $user->id)
                  ->orWhere('baker_id', $user->id)
                  ->orWhere('helper_id', $user->id)
                  ->orWhere('cleaner_id', $user->id)
                  ->orWhere('gatekeeper_id', $user->id);
            })->paginate(10)->withQueryString();
        }

    return Inertia::render('Bakeries/Index', [
        'bakeries' => $bakeries,
        'filters' => ['search' => $search],
        'auth_user' => [
            'id' => $user->id,
            'name' => $user->name,
        ],
    ]);


    }


    public function create()
    {
        $user = Auth::user();

        if (! $user->hasRole(['Super Admin', 'Owner', 'Manager'])) {
            abort(403, 'Unauthorized');
        }

        $users = User::select('id', 'name')->get();

        return Inertia::render('Bakeries/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (! $user->hasRole(['Super Admin', 'Owner', 'Manager'])) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'location' => ['nullable', 'string', 'max:255'],
            'longitude' => ['nullable', 'numeric'],
            'latitude' => ['nullable', 'numeric'],
            'monthly_rent_fee' => ['nullable', 'numeric', 'min:0'],
            'owner_id' => ['nullable', 'exists:users,id'],
            'manager_id' => ['nullable', 'exists:users,id'],
            'storekeeper_id' => ['nullable', 'exists:users,id'],
            'dough_mixer_id' => ['nullable', 'exists:users,id'],
            'baker_id' => ['nullable', 'exists:users,id'],
            'helper_id' => ['nullable', 'exists:users,id'],
            'cleaner_id' => ['nullable', 'exists:users,id'],
            'gatekeeper_id' => ['nullable', 'exists:users,id'],
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $validated['logo'] = $path;
        }

        Bakery::create($validated);

        return redirect()->route('bakeries.index')->with('success', 'Bakery created successfully.');
    }

    public function show($id)
    {
        $bakery = Bakery::findOrFail($id);
        $user = Auth::user();

        if (! $user->hasRole('Super Admin') && ! in_array($user->id, [
            $bakery->owner_id,
            $bakery->manager_id,
            $bakery->storekeeper_id,
            $bakery->dough_mixer_id,
            $bakery->baker_id,
            $bakery->helper_id,
            $bakery->cleaner_id,
            $bakery->gatekeeper_id,
        ])) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Bakeries/Show', [
            'bakery' => $bakery,
        ]);
    }

    public function edit($id)
    {
        $bakery = Bakery::findOrFail($id);
        $user = Auth::user();

        if (! $user->hasRole('Super Admin') &&
            $bakery->owner_id != $user->id &&
            $bakery->manager_id != $user->id) {
            abort(403, 'Unauthorized');
        }
    $bakery = Bakery::with([
        'owner:id,name',
        'manager:id,name',
        'storekeeper:id,name',
        'doughMixer:id,name',
        'baker:id,name',
        'helper:id,name',
        'cleaner:id,name',
        'gatekeeper:id,name',
    ])->findOrFail($id);


        $users = User::select('id', 'name')->get();

        return Inertia::render('Bakeries/Edit', [
            'bakery' => $bakery,
            'users' => $users,
        ]);
    }

 public function update(Request $request, $id)
 {
     $bakery = Bakery::findOrFail($id);
     $user = Auth::user();

     // Authorization check
     if (! $user->hasRole('Super Admin') &&
         $bakery->owner_id != $user->id &&
         $bakery->manager_id != $user->id) {
         abort(403, 'Unauthorized');
     }

     // Validate incoming data
     $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
                'location' => ['nullable', 'string', 'max:255'],
                'longitude' => ['nullable', 'numeric'],
                'latitude' => ['nullable', 'numeric'],
                'monthly_rent_fee' => ['nullable', 'numeric', 'min:0'],
                'owner_id' => ['nullable', 'exists:users,id'],
                'manager_id' => ['nullable', 'exists:users,id'],
                'storekeeper_id' => ['nullable', 'exists:users,id'],
                'dough_mixer_id' => ['nullable', 'exists:users,id'],
                'baker_id' => ['nullable', 'exists:users,id'],
                'helper_id' => ['nullable', 'exists:users,id'],
                'cleaner_id' => ['nullable', 'exists:users,id'],
                'gatekeeper_id' => ['nullable', 'exists:users,id'],
                'status' => ['required', 'string', 'in:Active,Inactive'], // <-- added validation rule

            ]);
     // Handle logo upload and delete old file if exists
     if ($request->hasFile('logo')) {
         // Delete old logo file from storage if exists
         if ($bakery->logo && \Storage::disk('public')->exists($bakery->logo)) {
             \Storage::disk('public')->delete($bakery->logo);
         }

         // Store new logo
         $path = $request->file('logo')->store('logos', 'public');
         $validated['logo'] = $path;
     }

     // Update bakery with validated data
     $bakery->update($validated);

     return redirect()->route('bakeries.index')->with('success', 'Bakery updated successfully.');
 }


    public function destroy($id)
    {
        $bakery = Bakery::findOrFail($id);
        $user = Auth::user();

        if (! $user->hasRole('Super Admin') && $bakery->owner_id != $user->id) {
            abort(403, 'Unauthorized');
        }

        $bakery->delete();

        return redirect()->route('bakeries.index')->with('success', 'Bakery deleted successfully.');
    }
}
