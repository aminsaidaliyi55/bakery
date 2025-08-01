// resources/js/Pages/RawMaterials/Edit.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface MaterialType {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface RawMaterial {
    id: number;
    name: string;
    description: string | null;
    material_type_id: number;
    bakery_id: number;
    unit: string;
    stock_quantity: number;
    reorder_level: number;
    price_per_unit: number;
}

interface PageProps {
    rawMaterial: RawMaterial;
    materialTypes: MaterialType[];
    bakeries: Bakery[];
    errors: Record<string, string[]>;
}

const Edit: React.FC = () => {
    const { rawMaterial, materialTypes, bakeries, errors } = usePage<PageProps>().props;

    const [form, setForm] = useState({
        name: rawMaterial.name || "",
        description: rawMaterial.description || "",
        material_type_id: rawMaterial.material_type_id.toString(),
        bakery_id: rawMaterial.bakery_id.toString(),
        unit: rawMaterial.unit || "",
        stock_quantity: rawMaterial.stock_quantity.toString(),
        reorder_level: rawMaterial.reorder_level.toString(),
        price_per_unit: rawMaterial.price_per_unit.toString(),
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.put(`/raw-materials/${rawMaterial.id}`, form);
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Edit Raw Material</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Material Type</label>
                        <select
                            name="material_type_id"
                            value={form.material_type_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Material Type</option>
                            {materialTypes.map((type) => (
                                <option key={type.id} value={type.id.toString()}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.material_type_id && <p className="text-red-600 text-sm">{errors.material_type_id[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Bakery</label>
                        <select
                            name="bakery_id"
                            value={form.bakery_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Bakery</option>
                            {bakeries.map((b) => (
                                <option key={b.id} value={b.id.toString()}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                        {errors.bakery_id && <p className="text-red-600 text-sm">{errors.bakery_id[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Unit</label>
                        <select
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Unit</option>
                            <option value="kg">kg</option>
                            <option value="litre">litre</option>
                        </select>
                        {errors.unit && <p className="text-red-600 text-sm">{errors.unit[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={form.stock_quantity}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full border rounded p-2"
                        />
                        {errors.stock_quantity && <p className="text-red-600 text-sm">{errors.stock_quantity[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Reorder Level</label>
                        <input
                            type="number"
                            name="reorder_level"
                            value={form.reorder_level}
                            onChange={handleChange}
                            min="0"
                            className="w-full border rounded p-2"
                        />
                        {errors.reorder_level && <p className="text-red-600 text-sm">{errors.reorder_level[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Price Per Unit</label>
                        <input
                            type="number"
                            name="price_per_unit"
                            value={form.price_per_unit}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full border rounded p-2"
                        />
                        {errors.price_per_unit && <p className="text-red-600 text-sm">{errors.price_per_unit[0]}</p>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
