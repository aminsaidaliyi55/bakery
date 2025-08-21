<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ContractController extends Controller
{
    // List all contracts
    public function index()
    {
        $contracts = Contract::with('supplier')->latest()->paginate(10);

        return Inertia::render('Contracts/Index', [
            'contracts' => $contracts
        ]);
    }

    // Show create form
    public function create()
    {
        $suppliers = Supplier::all(); // If contract is with suppliers

        return Inertia::render('Contracts/Create', [
            'suppliers' => $suppliers
        ]);
    }

    // Store new contract
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,expired,pending',
        ]);

        Contract::create([
            'id' => Str::uuid(), // If you're using UUIDs
            'supplier_id' => $validated['supplier_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('contracts.index')->with('success', 'Contract created successfully.');
    }

    // Show contract
    public function show(Contract $contract)
    {
        return Inertia::render('Contracts/Show', [
            'contract' => $contract->load('supplier')
        ]);
    }

    // Show edit form
    public function edit(Contract $contract)
    {
        $suppliers = Supplier::all();

        return Inertia::render('Contracts/Edit', [
            'contract' => $contract,
            'suppliers' => $suppliers
        ]);
    }

    // Update contract
    public function update(Request $request, Contract $contract)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,expired,pending',
        ]);

        $contract->update($validated);

        return redirect()->route('contracts.index')->with('success', 'Contract updated successfully.');
    }

    // Delete contract
    public function destroy(Contract $contract)
    {
        $contract->delete();

        return redirect()->route('contracts.index')->with('success', 'Contract deleted successfully.');
    }
}
