import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface User {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    role: string;
    salary: number;
    status: string;
    hired_at: string;
    user: User;
    bakery: Bakery;
}

interface PageProps {
    employees: {
        data: Employee[];
        links: any; // pagination links (optional)
    };
}

const Index: React.FC = () => {
    const { employees } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <Link href="/employees/create" className="btn-primary">
                        + Add Employee
                    </Link>
                </div>

                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Bakery</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Salary</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Hired At</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.data.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center p-4">
                                No employees found.
                            </td>
                        </tr>
                    ) : (
                        employees.data.map((emp) => (
                            <tr key={emp.id}>
                                <td className="p-2 border">{emp.user.name}</td>
                                <td className="p-2 border">{emp.bakery.name}</td>
                                <td className="p-2 border">{emp.role}</td>
                                <td className="p-2 border">{emp.salary}</td>
                                <td className="p-2 border">{emp.status}</td>
                                <td className="p-2 border">{new Date(emp.hired_at).toLocaleDateString()}</td>
                                <td className="p-2 border space-x-2">
                                    <Link href={`/employees/${emp.id}/edit`} className="text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                    {/* You can add Delete button here */}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default Index;
