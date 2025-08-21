import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout"; // adjust the path if needed

interface Bakery {
    id: number;
    name: string;
}

interface PastryCategory {
    id: number;
    name: string;
    description?: string;
    unit: string;
    is_active: boolean;
    bakery?: Bakery;
    image_path?: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    category: PastryCategory;
}

const Show: React.FC = () => {
    const { category } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{category.name}</h1>

                {category.image_path ? (
                    <img
                        src={`/storage/${category.image_path}`}
                        alt={category.name}
                        className="w-48 h-48 object-cover rounded mb-4"
                    />
                ) : (
                    <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-400 mb-4 rounded">
                        No Image
                    </div>
                )}

                <p className="mb-2">
                    <strong>Description:</strong>{" "}
                    {category.description ? category.description : "No description provided."}
                </p>

                <p className="mb-2">
                    <strong>Unit:</strong> {category.unit}
                </p>

                <p className="mb-2">
                    <strong>Bakery:</strong> {category.bakery?.name || "No bakery assigned"}
                </p>

                <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    {category.is_active ? (
                        <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                        <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                </p>

                <p className="mb-2 text-sm text-gray-500">
                    Created at: {new Date(category.created_at).toLocaleString()}
                </p>

                <p className="mb-6 text-sm text-gray-500">
                    Last updated: {new Date(category.updated_at).toLocaleString()}
                </p>

                <div className="flex space-x-4">
                    <Link
                        href={route("pastry-categories.index")}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Back to List
                    </Link>

                    <Link
                        href={route("pastry-categories.edit", category.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit Category
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
