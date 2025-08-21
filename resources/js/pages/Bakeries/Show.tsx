import React, { useEffect, useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";

// User interface: Represents a user with id, name, and role (like Owner, Manager, etc.)
interface User {
    id: number;
    name: string;
    role: string;
}

// Bakery interface: Represents bakery details and assigned employees in different roles
interface Bakery {
    id: number;
    name: string;
    location: string;
    owner?: User;
    manager?: User;
    storekeeper?: User;
    doughMixer?: User;
    baker?: User;
    helper?: User;
    cleaner?: User;
    gatekeeper?: User;
}

// Expense breakdown interface for clarity
interface ExpenseBreakdown {
    rawMaterialCost: number;
    employeeSalaries: number;
    employeeExpenses: number;
    employeeAllowances: number;
    rent: number;
}

// Props passed from Laravel backend via Inertia, including bakery and financial data
interface PageProps {
    bakery: Bakery;
    profitLoss: number; // Profit or loss calculated as revenue - expenses
    revenue: number; // Total income from bakery sales
    expenses: number; // Total cost incurred by the bakery
    expenseBreakdown: ExpenseBreakdown; // detailed expense components
}

const Show: React.FC = () => {
    // Extract props from Inertia page data
    const { bakery, profitLoss, revenue, expenses, expenseBreakdown } = usePage<PageProps>().props;

    // Local state to toggle blinking effect
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink((prev) => !prev);
        }, 700);
        return () => clearInterval(interval);
    }, []);

    // Helper to safely format numbers as currency with 2 decimals
    const formatCurrency = (value: any) => {
        const num = Number(value);
        if (isNaN(num)) return "0.00";
        return num.toFixed(2);
    };

    // Determine CSS class for profit/loss blinking and color
    const profitLossClass = profitLoss > 0
        ? `text-green-800 font-bold ${blink ? "opacity-100" : "opacity-50"} transition-opacity duration-500`
        : profitLoss < 0
            ? `text-red-700 font-bold ${blink ? "opacity-100" : "opacity-50"} transition-opacity duration-500`
            : "text-yellow-700 font-bold";

    // Helper function to display each assigned user role
    const renderUser = (label: string, user?: User) => (
        <div className="mb-1">
            <strong>{label}:</strong>{" "}
            {user ? (
                <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
                    {user.name} ({user.role})
                </Link>
            ) : (
                <span className="text-gray-500">Not assigned</span>
            )}
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">

            {/* Back Button */}
            <button
                onClick={() => router.visit('/bakeries')}
                className="mb-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ← Back
            </button>

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Bakery Overview</h1>

            {/* Bakery Basic Information Section */}
            <div className="mb-4">
                <p className="text-lg">
                    <strong>Name:</strong> {bakery.name}
                </p>
                <p className="text-lg">
                    <strong>Location:</strong> {bakery.location}
                </p>
            </div>

            {/* Financial Summary Section */}
            <div className="bg-gray-50 p-4 rounded border mb-6">
                <h2 className="text-xl font-semibold mb-3">Financial Summary</h2>
                <div className="space-y-1 text-base">

                    {/* Total Revenue */}
                    <p>
                        <strong>Total Revenue:</strong>{" "}
                        <span className="text-green-700">${formatCurrency(revenue)}</span>
                    </p>

                    {/* Total Expenses */}
                    <p>
                        <strong>Total Expenses:</strong>{" "}
                        <span className="text-red-600">${formatCurrency(expenses)}</span>
                    </p>

                    {/* Profit or Loss */}
                    <p>
                        <strong>Profit/Loss:</strong>{" "}
                        <span className={profitLossClass}>
              ${formatCurrency(profitLoss)}
            </span>
                    </p>

                    {/* Advisory Message */}
                    {profitLoss < 0 ? (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <strong>Warning:</strong> Your bakery is currently operating at a loss.
                            Consider the following strategies to improve profitability:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Review and negotiate raw material prices to reduce costs.</li>
                                <li>Optimize employee schedules to reduce overtime and unnecessary expenses.</li>
                                <li>Evaluate employee allowances and expenses for possible savings.</li>
                                <li>Increase marketing efforts to boost sales revenue.</li>
                                <li>Review pricing strategy to ensure competitive but profitable pricing.</li>
                                <li>Minimize rent and overheads if possible by renegotiating lease terms.</li>
                            </ul>
                        </div>
                    ) : profitLoss > 0 ? (
                        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            Great job! Your bakery is profitable. Keep optimizing operations and exploring growth opportunities.
                        </div>
                    ) : (
                        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                            Your bakery is breaking even. Monitor your expenses and revenue carefully to maintain profitability.
                        </div>
                    )}

                    {/* Detailed expense breakdown */}
                    <div className="mt-6 p-3 bg-white border rounded shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Expense Breakdown</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Raw Material Cost: ${formatCurrency(expenseBreakdown.rawMaterialCost)}</li>
                            <li>Employee Salaries: ${formatCurrency(expenseBreakdown.employeeSalaries)}</li>
                            <li>Employee Expenses: ${formatCurrency(expenseBreakdown.employeeExpenses)}</li>
                            <li>Employee Allowances: ${formatCurrency(expenseBreakdown.employeeAllowances)}</li>
                            <li>Monthly Rent Fee: ${formatCurrency(expenseBreakdown.rent)}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Assigned Employees Section */}
            <div className="bg-gray-50 p-4 rounded border">
                <h2 className="text-xl font-semibold mb-3">Assigned Employees</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderUser("Owner", bakery.owner)}
                    {renderUser("Manager", bakery.manager)}
                    {renderUser("Storekeeper", bakery.storekeeper)}
                    {renderUser("Dough Mixer", bakery.doughMixer)}
                    {renderUser("Baker", bakery.baker)}
                    {renderUser("Helper", bakery.helper)}
                    {renderUser("Cleaner", bakery.cleaner)}
                    {renderUser("Gatekeeper", bakery.gatekeeper)}
                </div>
            </div>
        </div>
    );
};

export default Show;
