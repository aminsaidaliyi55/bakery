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

interface PageProps {
    materialTypes: MaterialType[];
    bakeries: Bakery[];
    errors: Record<string, string[]>;
}

interface FormData {
    name: string;
    description: string;
    material_type_id: string;
    bakery_id: string;
    unit: string;
    stock_quantity: string;
    reorder_level: string;
    price_per_unit: string;
}

const Create: React.FC = () => {
    const { materialTypes, bakeries, errors } = usePage<PageProps>().props;

    const [form, setForm] = useState<FormData>({
        name: "",
        description: "",
        material_type_id: "",
        bakery_id: "",
        unit: "",
        stock_quantity: "",
        reorder_level: "",
        price_per_unit: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post("/rawMaterials", form);
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Add New Raw Material</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
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
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Material Type</label>
                        <select
                            name="material_type_id"
                            value={form.material_type_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Type</option>
                            {materialTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.material_type_id && <p className="text-red-600 text-sm">{errors.material_type_id[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Bakery</label>
                        <select
                            name="bakery_id"
                            value={form.bakery_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Bakery</option>
                            {bakeries.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                        {errors.bakery_id && <p className="text-red-600 text-sm">{errors.bakery_id[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Unit</label>
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
                        <label className="block mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={form.stock_quantity}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            min="0"
                            step="0.01"
                        />
                        {errors.stock_quantity && <p className="text-red-600 text-sm">{errors.stock_quantity[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Reorder Level</label>
                        <input
                            type="number"
                            name="reorder_level"
                            value={form.reorder_level}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            min="0"
                        />
                        {errors.reorder_level && <p className="text-red-600 text-sm">{errors.reorder_level[0]}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Price Per Unit</label>
                        <input
                            type="number"
                            name="price_per_unit"
                            value={form.price_per_unit}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            min="0"
                            step="0.01"
                        />
                        {errors.price_per_unit && <p className="text-red-600 text-sm">{errors.price_per_unit[0]}</p>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Save
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

export default Create;
