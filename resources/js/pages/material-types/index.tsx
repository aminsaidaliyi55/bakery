
// resources/js/Pages/MaterialTypes/Index.tsx

import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface MaterialType {
    id: number;
    name: string;
    created_at: string;
}

interface PageProps {
    materialTypes: MaterialType[];
}

const Index: React.FC = () => {
    const { materialTypes } = usePage<PageProps>().props;

    return (
        <AppLayout>
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Material Types</h1>
                <Link
                    href="/material-types/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Created At</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {materialTypes.map((type, index) => (
                        <tr key={type.id} className="border-t">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{type.name}</td>
                            <td className="px-4 py-2">
                                {new Date(type.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                                <Link
                                    href={`/material-types/${type.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/material-types/${type.id}`}
                                    method="delete"
                                    as="button"
                                    className="text-red-600 hover:underline"
                                    onBefore={() =>
                                        confirm("Are you sure you want to delete this?")
                                    }
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {materialTypes.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                No material types found.
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
