import React from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Cart {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    total_price: number;
    status: string;
}

interface Props {
    carts: {
        data: Cart[];
        links: any[];  // For pagination links if needed
        meta: any;     // Pagination meta info
    };
}

const Index: React.FC = () => {
    const { carts } = usePage<Props>().props;

    return (
        <AppLayout title="My Cart">
            <Head title="My Cart" />

            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Cart</h1>
                    <Link
                        href="/carts/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        + Add Product
                    </Link>
                </div>

                {carts.data.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 rounded">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Product</th>
                            <th className="border p-2 text-left">Quantity</th>
                            <th className="border p-2 text-left">Unit Price</th>
                            <th className="border p-2 text-left">Total Price</th>
                            <th className="border p-2 text-left">Status</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {carts.data.map((cart) => (
                            <tr key={cart.id} className="hover:bg-gray-50">
                                <td className="border p-2">{cart.product.name}</td>
                                <td className="border p-2">{cart.quantity}</td>
                                <td className="border p-2">${cart.price.toFixed(2)}</td>
                                <td className="border p-2">${cart.total_price.toFixed(2)}</td>
                                <td className="border p-2">{cart.status}</td>
                                <td className="border p-2">
                                    <Link
                                        href={`/carts/${cart.id}`}
                                        className="text-blue-600 hover:underline mr-2"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/carts/${cart.id}/edit`}
                                        className="text-green-600 hover:underline mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/carts/${cart.id}`}
                                        method="delete"
                                        as="button"
                                        className="text-red-600 hover:underline"
                                        onClick={(e) => {
                                            if (
                                                !confirm("Are you sure you want to delete this cart item?")
                                            ) {
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
                )}

                {/* Optional pagination UI */}
                {carts.meta?.last_page > 1 && (
                    <div className="mt-4 flex justify-center space-x-2">
                        {Array.from({ length: carts.meta.last_page }).map((_, i) => {
                            const page = i + 1;
                            return (
                                <Link
                                    key={page}
                                    href={`/carts?page=${page}`}
                                    className={`px-3 py-1 border rounded ${
                                        carts.meta.current_page === page
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-blue-600"
                                    }`}
                                >
                                    {page}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
