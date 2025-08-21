import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface RawMaterial {
    id: number;
    name: string;
    description?: string;
    unit: string;
    stock: number;
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
    filters: {
        search: string;
        bakery_id: string;
        material_type_id: string;
    };
    bakeries: { id: number; name: string }[];
    materialTypes: { id: number; name: string }[];
}

const Index: React.FC = () => {
    const { rawMaterials, filters, bakeries, materialTypes } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search || "");
    const [bakeryId, setBakeryId] = useState(filters.bakery_id || "");
    const [materialTypeId, setMaterialTypeId] = useState(filters.material_type_id || "");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                "/rawMaterials",
                {
                    search,
                    bakery_id: bakeryId,
                    material_type_id: materialTypeId,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, bakeryId, materialTypeId]);

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

                {/* Filters */}
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded w-1/3"
                    />
                    <select
                        value={materialTypeId}
                        onChange={(e) => setMaterialTypeId(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Types</option>
                        {materialTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={bakeryId}
                        onChange={(e) => setBakeryId(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Bakeries</option>
                        {bakeries.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
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
                                    <td className="px-4 py-2">{rm.stock}</td>
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
