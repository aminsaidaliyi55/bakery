<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Supplier;
use App\Models\RawMaterial;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    // List purchases with pagination
    public function index()
    {
        $purchases = Purchase::with(['supplier', 'rawMaterial', 'bakery'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Purchases/Index', [
            'purchases' => $purchases,
        ]);
    }

    // Show create form
    public function create()
    {
        // Pass suppliers, raw materials, and bakeries for selects
        return Inertia::render('Purchases/Create', [
            'suppliers' => Supplier::select('id', 'name')->get(),
            'rawMaterials' => RawMaterial::select('id', 'name')->get(),
            'bakeries' => Bakery::select('id', 'name')->get(),
        ]);
    }

    // Store a new purchase
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'raw_material_id' => 'required|exists:raw_materials,id',
            'quantity' => 'required|numeric|min:0.01',
            'price_per_unit' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string',
            'bakery_id' => 'required|exists:bakeries,id',
        ]);

        Purchase::create($validated);

        return redirect()->route('purchases.index')->with('success', 'Purchase created successfully.');
    }

    // Show purchase details
    public function show(Purchase $purchase)
    {
        $purchase->load(['supplier', 'rawMaterial', 'bakery']);

        return Inertia::render('Purchases/Show', [
            'purchase' => $purchase,
        ]);
    }

    // Show edit form
    public function edit(Purchase $purchase)
    {
        $purchase->load(['supplier', 'rawMaterial', 'bakery']);

        return Inertia::render('Purchases/Edit', [
            'purchase' => $purchase,
            'suppliers' => Supplier::select('id', 'name')->get(),
            'rawMaterials' => RawMaterial::select('id', 'name')->get(),
            'bakeries' => Bakery::select('id', 'name')->get(),
        ]);
    }

    // Update a purchase
    public function update(Request $request, Purchase $purchase)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'raw_material_id' => 'required|exists:raw_materials,id',
            'quantity' => 'required|numeric|min:0.01',
            'price_per_unit' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string',
            'bakery_id' => 'required|exists:bakeries,id',
        ]);

        $purchase->update($validated);

        return redirect()->route('purchases.index')->with('success', 'Purchase updated successfully.');
    }

    // Delete a purchase
    public function destroy(Purchase $purchase)
    {
        $purchase->delete();

        return redirect()->route('purchases.index')->with('success', 'Purchase deleted successfully.');
    }
}
