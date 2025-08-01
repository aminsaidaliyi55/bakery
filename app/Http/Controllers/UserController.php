<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users with optional search.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = User::with('roles');

        // If not Super Admin, restrict to users related to their bakery
        if (! $user->hasRole('Super Admin')) {

            // Find bakery IDs where this user holds any bakery role
            $bakeryIds = Bakery::where(function ($q) use ($user) {
                $q->where('owner_id', $user->id)
                    ->orWhere('manager_id', $user->id)
                    ->orWhere('storekeeper_id', $user->id)
                    ->orWhere('dough_mixer_id', $user->id)
                    ->orWhere('baker_id', $user->id)
                    ->orWhere('helper_id', $user->id)
                    ->orWhere('cleaner_id', $user->id)
                    ->orWhere('gatekeeper_id', $user->id);
            })->pluck('id');

            // Restrict users to those assigned in the same bakeries (in any role)
            $userIds = User::where(function($q) use ($bakeryIds) {
                $q->whereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('owner_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('manager_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('storekeeper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('dough_mixer_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('baker_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('helper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('cleaner_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('gatekeeper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                });
            })->pluck('id');

            $query->whereIn('id', $userIds);
        }

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'nullable|array',
            'roles.*' => ['integer', 'exists:roles,id'], // Validate role IDs
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        if (!empty($validated['roles'])) {
            // Convert role IDs to role names for syncRoles
            $roleNames = Role::whereIn('id', $validated['roles'])->pluck('name')->toArray();
            $user->syncRoles($roleNames);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user.
     */
    public function show(string $id)
    {
        $user = Auth::user();
        $targetUser = User::with('roles')->findOrFail($id);

        if (! $user->hasRole('Super Admin')) {
            // Restrict access if target user is not related to the current user's bakery
            $bakeryIds = Bakery::where(function ($q) use ($user) {
                $q->where('owner_id', $user->id)
                    ->orWhere('manager_id', $user->id)
                    ->orWhere('storekeeper_id', $user->id)
                    ->orWhere('dough_mixer_id', $user->id)
                    ->orWhere('baker_id', $user->id)
                    ->orWhere('helper_id', $user->id)
                    ->orWhere('cleaner_id', $user->id)
                    ->orWhere('gatekeeper_id', $user->id);
            })->pluck('id');

            $relatedUserIds = User::where(function($q) use ($bakeryIds) {
                $q->whereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('owner_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('manager_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('storekeeper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('dough_mixer_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('baker_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('helper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('cleaner_id')->from('bakeries')->whereIn('id', $bakeryIds);
                })
                ->orWhereIn('id', function ($q2) use ($bakeryIds) {
                    $q2->select('gatekeeper_id')->from('bakeries')->whereIn('id', $bakeryIds);
                });
            })->pluck('id');

            if (! $relatedUserIds->contains($targetUser->id)) {
                abort(403, 'Unauthorized');
            }
        }

        return Inertia::render('Users/Show', [
            'user' => $targetUser,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(string $id)
    {
        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'nullable|array',
            'roles.*' => ['integer', 'exists:roles,id'], // Validate role IDs
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        if (isset($validated['roles'])) {
            $roleNames = Role::whereIn('id', $validated['roles'])->pluck('name')->toArray();
            $user->syncRoles($roleNames);
        } else {
            $user->syncRoles([]);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
