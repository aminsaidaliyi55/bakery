import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface Role {
    id: number;
    name: string;
}

interface PageProps {
    roles: Role[];
}

const Index: React.FC<PageProps> = ({ roles }) => {
    return (
        <AppLayout>

        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Roles</h1>
                <Link
                    href="/roles/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    + Create Role
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Role Name</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((role) => (
                        <tr key={role.id} className="border-t">
                            <td className="p-3">{role.id}</td>
                            <td className="p-3">{role.name}</td>
                            <td className="p-3 space-x-2">
                                <Link
                                    href={`/roles/${role.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/roles/${role.id}/edit`}
                                    className="text-yellow-600 hover:underline"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {roles.length === 0 && (
                        <tr>
                            <td className="p-3 text-gray-500" colSpan={3}>
                                No roles found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
        </AppLayout>

    );
};

export default Index;
