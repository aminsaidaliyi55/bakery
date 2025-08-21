<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Bakery;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    // List all employees with pagination
    public function index()
    {
        $employees = Employee::with(['user', 'bakery'])->paginate(15);

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
        ]);
    }

    // Show form to create a new employee
    public function create()
    {
        $users = User::select('id', 'name')->get();
        $bakeries = Bakery::select('id', 'name')->get();

        return Inertia::render('Employees/Create', [
            'users' => $users,
            'bakeries' => $bakeries,
        ]);
    }

    // Store a new employee
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'role' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0',
            'hired_at' => 'required|date',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string|max:1000',
        ]);

        Employee::create($validated);

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    }

    // Show a single employee (optional)
    public function show(Employee $employee)
    {
        $employee->load(['user', 'bakery']);
        return Inertia::render('Employees/Show', [
            'employee' => $employee,
        ]);
    }

    // Show form to edit employee
    public function edit(Employee $employee)
    {
        $users = User::select('id', 'name')->get();
        $bakeries = Bakery::select('id', 'name')->get();

        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'users' => $users,
            'bakeries' => $bakeries,
        ]);
    }

    // Update an employee
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'role' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0',
            'hired_at' => 'required|date',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string|max:1000',
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully.');
    }

    // Delete an employee
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully.');
    }
}
