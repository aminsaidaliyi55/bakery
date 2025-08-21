<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use App\Models\MaterialType;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RawMaterialController extends Controller
{
    /**
     * Display a listing of the raw materials.
     */
public function index(Request $request)
{
    $query = RawMaterial::query()
        ->selectRaw('
            MIN(id) as id,
            name,
            material_type_id,
            bakery_id,
            unit,
            SUM(stock_quantity) as stock,
            SUM(reorder_level) as reorder_level,
            AVG(price_per_unit) as price_per_unit
        ')
        ->groupBy('name', 'material_type_id', 'bakery_id', 'unit')
        ->with(['materialType', 'bakery']);

    if ($request->filled('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    if ($request->filled('material_type_id')) {
        $query->where('material_type_id', $request->material_type_id);
    }

    if ($request->filled('bakery_id')) {
        $query->where('bakery_id', $request->bakery_id);
    }

    $rawMaterials = $query->get();

    return Inertia::render('rawMaterials/Index', [
        'rawMaterials' => $rawMaterials,
        'filters' => $request->only('search', 'material_type_id', 'bakery_id'),
        'bakeries' => \App\Models\Bakery::select('id', 'name')->get(),
        'materialTypes' => \App\Models\MaterialType::select('id', 'name')->get(),
    ]);
}





    /**
     * Show the form for creating a new raw material.
     */
    public function create()
    {
        return Inertia::render('rawMaterials/Create', [
            'materialTypes' => MaterialType::all(),
            'bakeries' => Bakery::all(),
        ]);
    }

    /**
     * Store a newly created raw material in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'material_type_id' => 'required|exists:material_types,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'unit' => 'required|string|in:kg,litre',
            'stock_quantity' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'price_per_unit' => 'required|numeric|min:0',
        ]);

        RawMaterial::create($validated);

        return redirect()->route('rawMaterials.index')->with('success', 'Raw material created successfully.');
    }

    /**
     * Show the form for editing the specified raw material.
     */
    public function edit(RawMaterial $rawMaterial)
    {
        return Inertia::render('RawMaterials/Edit', [
            'rawMaterial' => $rawMaterial,
            'materialTypes' => MaterialType::all(),
            'bakeries' => Bakery::all(),
        ]);
    }

    /**
     * Update the specified raw material in storage.
     */
    public function update(Request $request, RawMaterial $rawMaterial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'material_type_id' => 'required|exists:material_types,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'unit' => 'required|string|in:kg,litre',
            'stock_quantity' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'price_per_unit' => 'required|numeric|min:0',
        ]);

        $rawMaterial->update($validated);

        return redirect()->route('raw-materials.index')->with('success', 'Raw material updated successfully.');
    }

    /**
     * Remove the specified raw material from storage.
     */


     /**
      * Display the specified raw material.
      */
     public function show(RawMaterial $rawMaterial)
     {
         $rawMaterial->load(['materialType', 'bakery']);

         return Inertia::render('RawMaterials/Show', [
             'rawMaterial' => $rawMaterial,
         ]);
     }

    public function destroy(RawMaterial $rawMaterial)
    {
        $rawMaterial->delete();

        return redirect()->route('raw-materials.index')->with('success', 'Raw material deleted successfully.');
    }
}
