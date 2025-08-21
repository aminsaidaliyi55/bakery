import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Supplier {
    id: number;
    name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    city?: string;
    country?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    suppliers: {
        data: Supplier[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Index: React.FC<Props> = ({ suppliers }) => {
    return (
        <AppLayout title="Suppliers">
            <Head title="Supplier List" />

            <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Suppliers</h1>
                    <Link
                        href="/suppliers/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Supplier
                    </Link>
                </div>

                {suppliers.data.length === 0 ? (
                    <p>No suppliers found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded">
                            <thead className="bg-gray-100 font-semibold text-gray-700">
                            <tr>
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Contact Person</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                                <th className="border px-4 py-2 text-left">Phone</th>
                                <th className="border px-4 py-2 text-left">City</th>
                                <th className="border px-4 py-2 text-left">Country</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {suppliers.data.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{supplier.name}</td>
                                    <td className="border px-4 py-2">{supplier.contact_person || "-"}</td>
                                    <td className="border px-4 py-2">{supplier.email || "-"}</td>
                                    <td className="border px-4 py-2">{supplier.phone || "-"}</td>
                                    <td className="border px-4 py-2">{supplier.city || "-"}</td>
                                    <td className="border px-4 py-2">{supplier.country || "-"}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <Link
                                            href={`/suppliers/${supplier.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/suppliers/${supplier.id}/edit`}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/suppliers/${supplier.id}`}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this supplier?")) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-1">
                    {suppliers.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ""}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
