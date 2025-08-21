<?php

namespace App\Http\Controllers;

use App\Models\Pastry;
use App\Models\PastryCategory;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PastryController extends Controller
{
    // List all pastries with pagination
    public function index()
    {
        $pastries = Pastry::with(['category', 'bakery'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Pastries/Index', [
            'pastries' => $pastries,
        ]);
    }

    // Show create form
    public function create()
    {
        $categories = PastryCategory::all(['id', 'name']);
        $bakeries = Bakery::all(['id', 'name']);

        return Inertia::render('Pastries/Create', [
            'categories' => $categories,
            'bakeries' => $bakeries,
        ]);
    }

    // Store a new pastry
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sku' => 'required|string|unique:pastries,sku',
            'image' => 'nullable|string', // Consider using file upload logic if image file
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:pastry_categories,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'status' => 'required|string|in:available,out-of-stock',
        ]);

        Pastry::create($validated);

        return redirect()->route('pastries.index')->with('success', 'Pastry created successfully.');
    }

    // Show pastry details
    public function show(Pastry $pastry)
    {
        $pastry->load(['category', 'bakery']);
        return Inertia::render('Pastries/Show', [
            'pastry' => $pastry,
        ]);
    }

    // Show edit form
    public function edit(Pastry $pastry)
    {
        $categories = PastryCategory::all(['id', 'name']);
        $bakeries = Bakery::all(['id', 'name']);

        return Inertia::render('Pastries/Edit', [
            'pastry' => $pastry,
            'categories' => $categories,
            'bakeries' => $bakeries,
        ]);
    }

    // Update pastry
    public function update(Request $request, Pastry $pastry)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sku' => 'required|string|unique:pastries,sku,' . $pastry->id,
            'image' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:pastry_categories,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'status' => 'required|string|in:available,out-of-stock',
        ]);

        $pastry->update($validated);

        return redirect()->route('pastries.index')->with('success', 'Pastry updated successfully.');
    }

    // Delete pastry
    public function destroy(Pastry $pastry)
    {
        $pastry->delete();

        return redirect()->route('pastries.index')->with('success', 'Pastry deleted successfully.');
    }
}
