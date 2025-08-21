<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Bakery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
   public function index()
   {
       $sales = Sale::with(['bakery', 'product'])->latest()->paginate(10);

       return Inertia::render('Sales/Index', [
           'sales' => $sales,
       ]);
   }


    public function create()
    {
        return Inertia::render('Sales/Create', [
            'bakeries' => Bakery::all(),
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bakery_id' => 'required|exists:bakeries,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0.01',
            'unit_price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
            'customer_name' => 'nullable|string|max:255',
            'customer_contact' => 'nullable|string|max:255',
            'payment_method' => 'required|string|max:50',
            'notes' => 'nullable|string|max:1000',
        ]);

        $validated['total_price'] = $validated['quantity'] * $validated['unit_price'];

        Sale::create($validated);

        return redirect()->route('sales.index')->with('success', 'Sale created successfully.');
    }

    public function show(Sale $sale)
    {
        $sale->load(['bakery', 'product']);

        return Inertia::render('Sales/Show', [
            'sale' => $sale,
        ]);
    }

    public function edit(Sale $sale)
    {
        return Inertia::render('Sales/Edit', [
            'sale' => $sale,
            'bakeries' => Bakery::all(),
            'products' => Product::all(),
        ]);
    }

    public function update(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'bakery_id' => 'required|exists:bakeries,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0.01',
            'unit_price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
            'customer_name' => 'nullable|string|max:255',
            'customer_contact' => 'nullable|string|max:255',
            'payment_method' => 'required|string|max:50',
            'notes' => 'nullable|string|max:1000',
        ]);

        $validated['total_price'] = $validated['quantity'] * $validated['unit_price'];

        $sale->update($validated);

        return redirect()->route('sales.index')->with('success', 'Sale updated successfully.');
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();

        return redirect()->route('sales.index')->with('success', 'Sale deleted.');
    }
}
