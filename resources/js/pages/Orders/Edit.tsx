import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
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
    customer_id: number;
    bakery_id: number;
    status: string;
    total_amount: number;
    payment_status: string;
    order_date: string;
    delivery_date?: string;
    notes?: string;
}

interface Props {
    order: Order;
    customers: Customer[];
    bakeries: Bakery[];
}

const Edit: React.FC<Props> = ({ order, customers, bakeries }) => {
    const { data, setData, put, processing, errors } = useForm({
        order_number: order.order_number,
        customer_id: order.customer_id,
        bakery_id: order.bakery_id,
        status: order.status,
        total_amount: order.total_amount,
        payment_status: order.payment_status,
        order_date: order.order_date,
        delivery_date: order.delivery_date || "",
        notes: order.notes || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/orders/${order.id}`);
    };

    return (
        <AppLayout title={`Edit Order #${order.order_number}`}>
            <Head title={`Edit Order #${order.order_number}`} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Edit Order</h1>

                <form onSubmit={handleSubmit}>
                    {/* Order Number */}
                    <label className="block mb-2 font-semibold">Order Number:</label>
                    <input
                        type="text"
                        value={data.order_number}
                        onChange={(e) => setData("order_number", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        placeholder="Unique order identifier"
                    />
                    {errors.order_number && (
                        <div className="text-red-600 mb-2">{errors.order_number}</div>
                    )}

                    {/* Customer */}
                    <label className="block mb-2 font-semibold">Customer:</label>
                    <select
                        value={data.customer_id}
                        onChange={(e) => setData("customer_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a customer</option>
                        {customers.map((cust) => (
                            <option key={cust.id} value={cust.id}>
                                {cust.name}
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && (
                        <div className="text-red-600 mb-2">{errors.customer_id}</div>
                    )}

                    {/* Bakery */}
                    <label className="block mb-2 font-semibold">Bakery:</label>
                    <select
                        value={data.bakery_id}
                        onChange={(e) => setData("bakery_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a bakery</option>
                        {bakeries.map((bakery) => (
                            <option key={bakery.id} value={bakery.id}>
                                {bakery.name}
                            </option>
                        ))}
                    </select>
                    {errors.bakery_id && (
                        <div className="text-red-600 mb-2">{errors.bakery_id}</div>
                    )}

                    {/* Status */}
                    <label className="block mb-2 font-semibold">Status:</label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        placeholder="pending, completed, canceled..."
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.status && (
                        <div className="text-red-600 mb-2">{errors.status}</div>
                    )}

                    {/* Total Amount */}
                    <label className="block mb-2 font-semibold">Total Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.total_amount}
                        onChange={(e) => setData("total_amount", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.total_amount && (
                        <div className="text-red-600 mb-2">{errors.total_amount}</div>
                    )}

                    {/* Payment Status */}
                    <label className="block mb-2 font-semibold">Payment Status:</label>
                    <input
                        type="text"
                        value={data.payment_status}
                        onChange={(e) => setData("payment_status", e.target.value)}
                        placeholder="paid, unpaid, refunded..."
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.payment_status && (
                        <div className="text-red-600 mb-2">{errors.payment_status}</div>
                    )}

                    {/* Order Date */}
                    <label className="block mb-2 font-semibold">Order Date:</label>
                    <input
                        type="date"
                        value={data.order_date}
                        onChange={(e) => setData("order_date", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.order_date && (
                        <div className="text-red-600 mb-2">{errors.order_date}</div>
                    )}

                    {/* Delivery Date */}
                    <label className="block mb-2 font-semibold">Delivery Date:</label>
                    <input
                        type="date"
                        value={data.delivery_date}
                        onChange={(e) => setData("delivery_date", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.delivery_date && (
                        <div className="text-red-600 mb-2">{errors.delivery_date}</div>
                    )}

                    {/* Notes */}
                    <label className="block mb-2 font-semibold">Notes:</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                        rows={3}
                    />

                    {/* Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <Link href="/orders" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
