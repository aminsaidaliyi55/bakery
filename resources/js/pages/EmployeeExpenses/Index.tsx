import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Employee {
    id: number;
    user: { name: string };
}

interface Bakery {
    id: number;
    name: string;
}

interface Manager {
    id: number;
    name: string;
}

interface Expense {
    id: number;
    employee: Employee;
    bakery: Bakery;
    manager: Manager;
    amount: number;
    description?: string;
    created_at: string;
}

interface Props {
    expenses: Expense[];
}

const Index: React.FC = () => {
    const { expenses } = usePage<Props>().props;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee Expenses</h1>
                    <Link
                        href="/daily-expenses/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Expense
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Employee</th>
                            <th className="px-4 py-2 text-left">Bakery</th>
                            <th className="px-4 py-2 text-left">Manager</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No expenses found.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((exp) => (
                                <tr key={exp.id}>
                                    <td className="px-4 py-2">{exp.employee.user.name}</td>
                                    <td className="px-4 py-2">{exp.bakery.name}</td>
                                    <td className="px-4 py-2">{exp.manager.name}</td>
                                    <td className="px-4 py-2">${exp.amount.toFixed(2)}</td>
                                    <td className="px-4 py-2">{exp.description || '-'}</td>
                                    <td className="px-4 py-2">{new Date(exp.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
