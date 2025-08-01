import React, { useState } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface Props extends PageProps {
    permissions: Permission[];
}

export default function Index() {
    // Get permissions from Inertia page props with fallback
    const { permissions = [] } = usePage<Props>().props;

    const [query, setQuery] = useState('');

    const filteredPermissions = permissions.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Permissions',
            href: '/permissions',
        },
    ];

    // Handler for deleting permission
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(route('permissions.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Permissions</h1>
                    <Link
                        href={route('permissions.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Add Permission
                    </Link>
                </div>

                <input
                    type="text"
                    aria-label="Search permissions"
                    placeholder="Search permissions..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
                />

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b text-left">ID</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Guard</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPermissions.length > 0 ? (
                        filteredPermissions.map((permission) => (
                            <tr key={permission.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{permission.id}</td>
                                <td className="py-2 px-4 border-b">{permission.name}</td>
                                <td className="py-2 px-4 border-b">{permission.guard_name}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <Link
                                        href={route('permissions.show', permission.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        href={route('permissions.edit', permission.id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(permission.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                                No permissions found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
