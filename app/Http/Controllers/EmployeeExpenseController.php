<?php

namespace App\Http\Controllers;

use App\Models\EmployeeExpense;
use App\Models\Employee;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeExpenseController extends Controller
{
    public function index()
    {
        $expenses = EmployeeExpense::with(['employee.user', 'bakery', 'manager'])
            ->latest()
            ->get();

        return Inertia::render('EmployeeExpenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    public function create()
    {
        $employees = Employee::with('user')->get();
        $bakeries = Bakery::all();

        return Inertia::render('EmployeeExpenses/Create', [
            'employees' => $employees,
            'bakeries' => $bakeries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string|max:1000',
        ]);

        $validated['manager_id'] = auth()->id();

        EmployeeExpense::create($validated);

        return redirect()->route('daily-expenses.index')->with('success', 'Expense recorded successfully.');
    }
}
