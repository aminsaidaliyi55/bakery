<?php

namespace App\Http\Controllers;

use App\Models\MaterialType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialTypeController extends Controller
{
    /**
     * Display a listing of the material types.
     */
    public function index()
    {
        $materialTypes = MaterialType::latest()->get();

        return Inertia::render('material-types/index', [
            'materialTypes' => $materialTypes,
        ]);
    }

    /**
     * Show the form for creating a new material type.
     */
    public function create()
    {
        return Inertia::render('material-types/create');
    }

    /**
     * Store a newly created material type in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:material_types,name',
        ]);

        MaterialType::create($validated);

        return redirect()->route('material-types.index')->with('success', 'Material type created successfully.');
    }

    /**
     * Show the form for editing the specified material type.
     */
    public function edit(MaterialType $materialType)
    {
        return Inertia::render('material-types/edit', [
            'materialType' => $materialType,
        ]);
    }

    /**
     * Update the specified material type in storage.
     */
    public function update(Request $request, MaterialType $materialType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:material_types,name,' . $materialType->id,
        ]);

        $materialType->update($validated);

        return redirect()->route('material-types.index')->with('success', 'Material type updated successfully.');
    }

    /**
     * Remove the specified material type from storage.
     */
    public function destroy(MaterialType $materialType)
    {
        $materialType->delete();

        return redirect()->route('
        .index')->with('success', 'Material type deleted successfully.');
    }
}
