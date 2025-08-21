<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InventoryController extends Controller
{
    // ✅ List all inventory items
    public function index()
    {
        $inventories = Inventory::with('product')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Inventory/Index', [
            'inventories' => $inventories
        ]);
    }

    // ✅ Show form to add new inventory
    public function create()
    {
        $products = Product::all();

        return Inertia::render('Inventory/Create', [
            'products' => $products
        ]);
    }

    // ✅ Store new inventory
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'status' => 'nullable|in:pending,approved,rejected',
        ]);

        Inventory::create([
            'id' => Str::uuid(), // only if using UUID
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
            'unit' => $validated['unit'],
            'status' => $validated['status'] ?? 'pending',
        ]);

        return redirect()->route('inventory.index')->with('success', 'Inventory item added.');
    }

    // ✅ Edit form
    public function edit(Inventory $inventory)
    {
        $products = Product::all();

        return Inertia::render('Inventory/Edit', [
            'inventory' => $inventory->load('product'),
            'products' => $products
        ]);
    }

    // ✅ Update inventory item
    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'status' => 'nullable|in:pending,approved,rejected',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory.index')->with('success', 'Inventory item updated.');
    }

    // ✅ Delete inventory
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();

        return redirect()->route('inventory.index')->with('success', 'Inventory item deleted.');
    }
}
