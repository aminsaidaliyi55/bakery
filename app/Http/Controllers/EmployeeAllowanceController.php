<?php

namespace App\Http\Controllers;

use App\Models\EmployeeAllowance;
use App\Models\Employee;
use App\Models\Bakery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeAllowanceController extends Controller
{
    public function index()
    {
        $allowances = EmployeeAllowance::with(['employee.user', 'bakery', 'manager'])
            ->latest()
            ->get();

        return Inertia::render('EmployeeAllowances/Index', [
            'allowances' => $allowances,
        ]);
    }

    public function create()
    {
        $employees = Employee::with('user')->get();
        $bakeries = Bakery::all();

        return Inertia::render('EmployeeAllowances/Create', [
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
            'allowance_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
        ]);

        $validated['manager_id'] = auth()->id();

        EmployeeAllowance::create($validated);

        return redirect()->route('employee-allowances.index')->with('success', 'Allowance recorded successfully.');
    }
}
