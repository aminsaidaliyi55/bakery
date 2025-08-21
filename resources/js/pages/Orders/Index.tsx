import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Customer {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Order {
    id: number;
    order_number: string;
    customer: Customer;
    bakery: Bakery;
    status: string;
    total_amount: number;
    payment_status: string;
    order_date: string;
    delivery_date?: string;
    notes?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    orders: {
        data: Order[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Index: React.FC<Props> = ({ orders }) => {
    return (
        <AppLayout title="Orders">
            <Head title="Orders List" />

            <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Orders</h1>
                    <Link
                        href="/orders/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Order
                    </Link>
                </div>

                {orders.data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded">
                            <thead className="bg-gray-100 font-semibold text-gray-700">
                            <tr>
                                <th className="border px-4 py-2 text-left">Order #</th>
                                <th className="border px-4 py-2 text-left">Customer</th>
                                <th className="border px-4 py-2 text-left">Bakery</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Total Amount</th>
                                <th className="border px-4 py-2 text-left">Payment Status</th>
                                <th className="border px-4 py-2 text-left">Order Date</th>
                                <th className="border px-4 py-2 text-left">Delivery Date</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.data.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{order.order_number}</td>
                                    <td className="border px-4 py-2">{order.customer.name}</td>
                                    <td className="border px-4 py-2">{order.bakery.name}</td>
                                    <td className="border px-4 py-2">{order.status}</td>
                                    <td className="border px-4 py-2">${order.total_amount.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{order.payment_status}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(order.order_date).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.delivery_date
                                            ? new Date(order.delivery_date).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/orders/${order.id}/edit`}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/orders/${order.id}`}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this order?")) {
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
                    {orders.links.map((link, index) => (
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
