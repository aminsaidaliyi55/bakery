<?php

namespace App\Http\Controllers;

use App\Models\PastryCategory;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PastryCategoryController extends Controller
{
   public function index(Request $request)
   {
       $query = PastryCategory::with('bakery');

       // Search by name
       if ($request->filled('search')) {
           $query->where('name', 'like', '%' . $request->search . '%');
       }

       // Filter by status (active/inactive)
       if ($request->filled('status')) {
           if ($request->status === 'active') {
               $query->where('is_active', true);
           } elseif ($request->status === 'inactive') {
               $query->where('is_active', false);
           }
       }

       // Paginate results, preserving query string parameters
       $categories = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

       return Inertia::render('PastryCategories/Index', [
           'categories' => $categories,
           'filters' => $request->only(['search', 'status']),
       ]);
   }


    public function create()
    {
        $bakeries = Bakery::select('id', 'name')->get();

        return Inertia::render('PastryCategories/Create', [
            'bakeries' => $bakeries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:pastry_categories,name',
            'description' => 'nullable|string',
            'unit' => 'required|string',
            'is_active' => 'boolean',
            'bakery_id' => 'nullable|exists:bakeries,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('pastry_categories', 'public');
        }

        PastryCategory::create($validated);

        return redirect()->route('pastry-categories.index')->with('success', 'Category created.');
    }

    public function show(PastryCategory $pastryCategory)
    {
        $pastryCategory->load('bakery');

        return Inertia::render('PastryCategories/Show', [
            'category' => $pastryCategory,
        ]);
    }

    public function edit(PastryCategory $pastryCategory)
    {
        $bakeries = Bakery::select('id', 'name')->get();

        return Inertia::render('PastryCategories/Edit', [
            'category' => $pastryCategory,
            'bakeries' => $bakeries,
        ]);
    }

    public function update(Request $request, PastryCategory $pastryCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:pastry_categories,name,' . $pastryCategory->id,
            'description' => 'nullable|string',
            'unit' => 'required|string',
            'is_active' => 'boolean',
            'bakery_id' => 'nullable|exists:bakeries,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // delete old image
            if ($pastryCategory->image_path) {
                Storage::disk('public')->delete($pastryCategory->image_path);
            }

            $validated['image_path'] = $request->file('image')->store('pastry_categories', 'public');
        }

        $pastryCategory->update($validated);

        return redirect()->route('pastry-categories.index')->with('success', 'Category updated.');
    }

    public function destroy(PastryCategory $pastryCategory)
    {
        // delete image if exists
        if ($pastryCategory->image_path) {
            Storage::disk('public')->delete($pastryCategory->image_path);
        }

        $pastryCategory->delete();

        return redirect()->route('pastry-categories.index')->with('success', 'Category deleted.');
    }
}
