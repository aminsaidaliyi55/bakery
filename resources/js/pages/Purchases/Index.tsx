import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Supplier {
    id: number;
    name: string;
}

interface RawMaterial {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Purchase {
    id: number;
    supplier: Supplier;
    rawMaterial: RawMaterial;
    bakery: Bakery;
    quantity: number;
    price_per_unit: number;
    total_price: number;
    purchase_date: string;
    status: string;
    notes?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    purchases: {
        data: Purchase[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Index: React.FC<Props> = ({ purchases }) => {
    return (
        <AppLayout title="Purchases">
            <Head title="Purchases List" />

            <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Purchases</h1>
                    <Link
                        href="/purchases/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Purchase
                    </Link>
                </div>

                {purchases.data.length === 0 ? (
                    <p>No purchases found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded">
                            <thead className="bg-gray-100 font-semibold text-gray-700">
                            <tr>
                                <th className="border px-4 py-2 text-left">Supplier</th>
                                <th className="border px-4 py-2 text-left">Raw Material</th>
                                <th className="border px-4 py-2 text-left">Bakery</th>
                                <th className="border px-4 py-2 text-left">Quantity</th>
                                <th className="border px-4 py-2 text-left">Price/Unit</th>
                                <th className="border px-4 py-2 text-left">Total Price</th>
                                <th className="border px-4 py-2 text-left">Purchase Date</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchases.data.map((purchase) => (
                                <tr key={purchase.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{purchase.supplier.name}</td>
                                    <td className="border px-4 py-2">{purchase.rawMaterial.name}</td>
                                    <td className="border px-4 py-2">{purchase.bakery.name}</td>
                                    <td className="border px-4 py-2">{purchase.quantity}</td>
                                    <td className="border px-4 py-2">${purchase.price_per_unit.toFixed(2)}</td>
                                    <td className="border px-4 py-2">${purchase.total_price.toFixed(2)}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(purchase.purchase_date).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2">{purchase.status}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <Link
                                            href={`/purchases/${purchase.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/purchases/${purchase.id}/edit`}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/purchases/${purchase.id}`}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this purchase?")) {
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
                    {purchases.links.map((link, index) => (
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
