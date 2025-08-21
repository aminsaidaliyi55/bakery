<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Models\Bakery;
use App\Models\Product;   // <--- Add this line
use App\Models\Employee;  // <--- Add this line
use Illuminate\Http\Request;
use Inertia\Inertia; // If you use Inertia.js frontend

class ProductionController extends Controller
{
    // List all productions with related data
public function index()
{
    $productions = Production::all(); // returns a collection (array-like)
    return Inertia::render('Productions/Index', [
        'productions' => $productions,
    ]);
}


    // Show the form for creating a new production
    public function create()
    {
        $bakeries = Bakery::all();
        $products = Product::all();
        $employees = Employee::all();

        return Inertia::render('Productions/Create', [
            'bakeries' => $bakeries,
            'products' => $products,
            'employees' => $employees,
        ]);
    }

    // Store a new production record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bakery_id' => 'required|exists:bakeries,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
            'production_date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string|max:255',
        ]);

        Production::create($validated);

        return redirect()->route('productions.index')->with('success', 'Production record created successfully.');
    }

    // Show a single production record detail
    public function show(Production $production)
    {
        $production->load(['bakery', 'product', 'employee']);

        return Inertia::render('Productions/Show', [
            'production' => $production,
        ]);
    }

    // Show the form to edit an existing production record
    public function edit(Production $production)
    {
        $bakeries = Bakery::all();
        $products = Product::all();
        $employees = Employee::all();

        return Inertia::render('Productions/Edit', [
            'production' => $production,
            'bakeries' => $bakeries,
            'products' => $products,
            'employees' => $employees,
        ]);
    }

    // Update an existing production record
    public function update(Request $request, Production $production)
    {
        $validated = $request->validate([
            'bakery_id' => 'required|exists:bakeries,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
            'production_date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string|max:255',
        ]);

        $production->update($validated);

        return redirect()->route('productions.show', $production)->with('success', 'Production record updated successfully.');
    }

    // Delete a production record
    public function destroy(Production $production)
    {
        $production->delete();

        return redirect()->route('productions.index')->with('success', 'Production record deleted successfully.');
    }
}
