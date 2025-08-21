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

interface Allowance {
    id: number;
    employee: Employee;
    bakery: Bakery;
    manager: Manager;
    amount: number;
    allowance_date: string;
    description?: string;
    created_at: string;
}

interface Props {
    allowances: Allowance[];
}

const Index: React.FC = () => {
    const { allowances } = usePage<Props>().props;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daily Employee Allowances</h1>
                    <Link
                        href="/employee-allowances/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Allowance
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
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Description</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {allowances.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No allowances found.
                                </td>
                            </tr>
                        ) : (
                            allowances.map((allowance) => (
                                <tr key={allowance.id}>
                                    <td className="px-4 py-2">{allowance.employee.user.name}</td>
                                    <td className="px-4 py-2">{allowance.bakery.name}</td>
                                    <td className="px-4 py-2">{allowance.manager.name}</td>
                                    <td className="px-4 py-2">${allowance.amount.toFixed(2)}</td>
                                    <td className="px-4 py-2">{new Date(allowance.allowance_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{allowance.description || '-'}</td>
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
