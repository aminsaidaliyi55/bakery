import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface CreateProductionProps {
    bakeryId: number;
    products: { id: number; name: string }[];
    employees: { id: number; name: string }[];
}

const Create: React.FC<CreateProductionProps> = ({ bakeryId, products, employees }) => {
    const { data, setData, post, processing, errors } = useForm({
        bakery_id: bakeryId,
        product_id: "",
        quantity: "",
        production_date: "",
        employee_id: "",
        status: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/productions");
    };

    return (
        <AppLayout title="New Production">
            <Head title="Create Production" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Create New Production</h1>

                <form onSubmit={handleSubmit}>
                    {/* products Select */}
                    <label className="block mb-2 font-semibold">Product:</label>
                    <select
                        value={data.product_id}
                        onChange={e => setData("product_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                    {errors.product_id && <div className="text-red-600 mb-2">{errors.product_id}</div>}

                    {/* Quantity */}
                    <label className="block mb-2 font-semibold">Quantity:</label>
                    <input
                        type="number"
                        value={data.quantity}
                        onChange={e => setData("quantity", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        min="1"
                    />
                    {errors.quantity && <div className="text-red-600 mb-2">{errors.quantity}</div>}

                    {/* Production Date */}
                    <label className="block mb-2 font-semibold">Production Date:</label>
                    <input
                        type="date"
                        value={data.production_date}
                        onChange={e => setData("production_date", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.production_date && <div className="text-red-600 mb-2">{errors.production_date}</div>}

                    {/* Employee Select */}
                    <label className="block mb-2 font-semibold">Employee:</label>
                    <select
                        value={data.employee_id}
                        onChange={e => setData("employee_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select an employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                    </select>
                    {errors.employee_id && <div className="text-red-600 mb-2">{errors.employee_id}</div>}

                    {/* Status */}
                    <label className="block mb-2 font-semibold">Status:</label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={e => setData("status", e.target.value)}
                        placeholder="e.g. completed, pending"
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.status && <div className="text-red-600 mb-2">{errors.status}</div>}

                    {/* Notes */}
                    <label className="block mb-2 font-semibold">Notes:</label>
                    <textarea
                        value={data.notes}
                        onChange={e => setData("notes", e.target.value)}
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
                            Save
                        </button>
                        <Link href="/productions" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
