import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface RawMaterial {
    id: number;
    name: string;
    description?: string;
    unit: string;
    stock_quantity: number;
    reorder_level: number;
    price_per_unit: number;
    material_type: {
        id: number;
        name: string;
    };
    bakery: {
        id: number;
        name: string;
    };
}

interface PageProps {
    rawMaterials: RawMaterial[];
}

const Index: React.FC = () => {
    const { rawMaterials } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Raw Materials</h1>
                    <Link
                        href="/rawMaterials/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add New
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Bakery</th>
                            <th className="px-4 py-2 text-left">Unit</th>
                            <th className="px-4 py-2 text-left">Stock</th>
                            <th className="px-4 py-2 text-left">Reorder Level</th>
                            <th className="px-4 py-2 text-left">Price/Unit</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {rawMaterials.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-gray-500">
                                    No raw materials found.
                                </td>
                            </tr>
                        ) : (
                            rawMaterials.map((rm) => (
                                <tr key={rm.id}>
                                    <td className="px-4 py-2">{rm.name}</td>
                                    <td className="px-4 py-2">{rm.material_type?.name}</td>
                                    <td className="px-4 py-2">{rm.bakery?.name}</td>
                                    <td className="px-4 py-2">{rm.unit}</td>
                                    <td className="px-4 py-2">{rm.stock_quantity}</td>
                                    <td className="px-4 py-2">{rm.reorder_level}</td>
                                    <td className="px-4 py-2">{rm.price_per_unit}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <Link
                                            href={`/raw-materials/${rm.id}/edit`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/raw-materials/${rm.id}`}
                                            className="text-red-600 hover:underline"
                                            onBefore={() =>
                                                confirm("Are you sure you want to delete this?")
                                            }
                                        >
                                            Delete
                                        </Link>
                                    </td>
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
