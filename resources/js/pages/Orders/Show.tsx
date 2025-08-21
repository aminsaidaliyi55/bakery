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

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
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
    orderItems: OrderItem[];
}

interface Props {
    order: Order;
}

const Show: React.FC<Props> = ({ order }) => {
    return (
        <AppLayout title={`Order #${order.order_number}`}>
            <Head title={`Order #${order.order_number}`} />

            <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-6">Order Details</h1>

                <div className="mb-4 space-y-2 text-gray-700">
                    <div>
                        <strong>Order Number:</strong> {order.order_number}
                    </div>
                    <div>
                        <strong>Customer:</strong> {order.customer.name}
                    </div>
                    <div>
                        <strong>Bakery:</strong> {order.bakery.name}
                    </div>
                    <div>
                        <strong>Status:</strong> {order.status}
                    </div>
                    <div>
                        <strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}
                    </div>
                    <div>
                        <strong>Payment Status:</strong> {order.payment_status}
                    </div>
                    <div>
                        <strong>Order Date:</strong>{" "}
                        {new Date(order.order_date).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Delivery Date:</strong>{" "}
                        {order.delivery_date
                            ? new Date(order.delivery_date).toLocaleDateString()
                            : "-"}
                    </div>
                    <div>
                        <strong>Notes:</strong>
                        <p className="whitespace-pre-line">{order.notes || "-"}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                {order.orderItems.length === 0 ? (
                    <p>No items in this order.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 rounded mb-6">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Product Name</th>
                            <th className="border px-4 py-2 text-left">Quantity</th>
                            <th className="border px-4 py-2 text-left">Price</th>
                            <th className="border px-4 py-2 text-left">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.orderItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{item.product_name}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">${item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <Link
                    href="/orders"
                    className="inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Back to Orders
                </Link>
            </div>
        </AppLayout>
    );
};

export default Show;
