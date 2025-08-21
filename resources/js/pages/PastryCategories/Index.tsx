import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

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
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface PageProps {
    categories: {
        data: PastryCategory[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search?: string;
        status?: string;
    };
}

const Index: React.FC = () => {
    const { categories, filters } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    // State for zoom modal image path
    const [zoomImage, setZoomImage] = useState<string | null>(null);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (search.trim()) params.append("search", search.trim());
        if (status) params.append("status", status);

        window.location.href = route("pastry-categories.index") + "?" + params.toString();
    };

    // Close modal on ESC key
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setZoomImage(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <AppLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Pastry Categories</h1>
                    <Link
                        href={route("pastry-categories.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        + Add Category
                    </Link>
                </div>

                <form onSubmit={handleFilterSubmit} className="mb-4 flex space-x-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 w-60"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
                        Filter
                    </button>

                    {(search || status) && (
                        <button
                            type="button"
                            className="text-gray-600 underline"
                            onClick={() => {
                                setSearch("");
                                setStatus("");
                                window.location.href = route("pastry-categories.index");
                            }}
                        >
                            Clear
                        </button>
                    )}
                </form>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="w-full table-auto text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Bakery</th>
                            <th className="px-4 py-2 text-left">Unit</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.data.length > 0 ? (
                            categories.data.map((category) => (
                                <tr key={category.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 cursor-pointer" onClick={() => category.image_path && setZoomImage(category.image_path)}>
                                        {category.image_path ? (
                                            <img
                                                src={`/storage/${category.image_path}`}
                                                alt={category.name}
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No image</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 font-medium">{category.name}</td>
                                    <td className="px-4 py-2">{category.bakery?.name || "-"}</td>
                                    <td className="px-4 py-2">{category.unit}</td>
                                    <td className="px-4 py-2">
                                        {category.is_active ? (
                                            <span className="text-green-600 font-semibold">Active</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Inactive</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 space-x-3">
                                        <Link
                                            href={route("pastry-categories.show", category.id)}
                                            className="text-green-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route("pastry-categories.edit", category.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            method="delete"
                                            as="button"
                                            href={route("pastry-categories.destroy", category.id)}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this category?")) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <nav className="mt-4 flex justify-center space-x-2">
                    {categories.links.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.url || undefined}
                            className={`px-3 py-1 rounded border ${
                                link.active
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </nav>

                {/* Zoom Modal */}
                {zoomImage && (
                    <div
                        onClick={() => setZoomImage(null)}
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out"
                    >
                        <img
                            src={`/storage/${zoomImage}`}
                            alt="Zoomed Pastry Category"
                            className="max-w-full max-h-full rounded shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
