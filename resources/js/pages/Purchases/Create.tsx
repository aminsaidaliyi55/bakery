import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
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

interface Props {
    suppliers: Supplier[];
    rawMaterials: RawMaterial[];
    bakeries: Bakery[];
}

const Create: React.FC<Props> = ({ suppliers, rawMaterials, bakeries }) => {
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: "",
        raw_material_id: "",
        bakery_id: "",
        quantity: "",
        price_per_unit: "",
        total_price: "",
        purchase_date: "",
        status: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/purchases");
    };

    return (
        <AppLayout title="Create Purchase">
            <Head title="Create Purchase" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Create New Purchase</h1>

                <form onSubmit={handleSubmit}>

                    {/* Supplier */}
                    <label className="block mb-2 font-semibold">Supplier:</label>
                    <select
                        value={data.supplier_id}
                        onChange={(e) => setData("supplier_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    {errors.supplier_id && <div className="text-red-600 mb-2">{errors.supplier_id}</div>}

                    {/* Raw Material */}
                    <label className="block mb-2 font-semibold">Raw Material:</label>
                    <select
                        value={data.raw_material_id}
                        onChange={(e) => setData("raw_material_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a raw material</option>
                        {rawMaterials.map((rm) => (
                            <option key={rm.id} value={rm.id}>
                                {rm.name}
                            </option>
                        ))}
                    </select>
                    {errors.raw_material_id && <div className="text-red-600 mb-2">{errors.raw_material_id}</div>}

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
                    {errors.bakery_id && <div className="text-red-600 mb-2">{errors.bakery_id}</div>}

                    {/* Quantity */}
                    <label className="block mb-2 font-semibold">Quantity:</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.quantity && <div className="text-red-600 mb-2">{errors.quantity}</div>}

                    {/* Price per Unit */}
                    <label className="block mb-2 font-semibold">Price per Unit:</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.price_per_unit}
                        onChange={(e) => setData("price_per_unit", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.price_per_unit && <div className="text-red-600 mb-2">{errors.price_per_unit}</div>}

                    {/* Total Price */}
                    <label className="block mb-2 font-semibold">Total Price:</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.total_price}
                        onChange={(e) => setData("total_price", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.total_price && <div className="text-red-600 mb-2">{errors.total_price}</div>}

                    {/* Purchase Date */}
                    <label className="block mb-2 font-semibold">Purchase Date:</label>
                    <input
                        type="date"
                        value={data.purchase_date}
                        onChange={(e) => setData("purchase_date", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.purchase_date && <div className="text-red-600 mb-2">{errors.purchase_date}</div>}

                    {/* Status */}
                    <label className="block mb-2 font-semibold">Status:</label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        placeholder="e.g. pending, completed"
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.status && <div className="text-red-600 mb-2">{errors.status}</div>}

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
                            Save
                        </button>
                        <Link href="/purchases" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
