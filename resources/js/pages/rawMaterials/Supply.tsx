import React, { useState, ChangeEvent, FormEvent } from "react";
import { router } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface Bakery {
    id: number;
    name: string;
}

interface RawMaterial {
    id: number;
    name: string;
}

interface Props {
    bakeries: Bakery[];
    rawMaterials: RawMaterial[];
}

interface FormData {
    bakery_id: string;
    raw_material_id: string;
    quantity: string;
    measurement_unit: string;
}

const Supply: React.FC<Props> = ({ bakeries, rawMaterials }) => {
    const [form, setForm] = useState<FormData>({
        bakery_id: "",
        raw_material_id: "",
        quantity: "",
        measurement_unit: "",
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post("/rawMaterialsSup/supply", form, {
            onSuccess: () => alert("Supply recorded successfully!"),
            onError: (errs) => setErrors(errs),
        });
    };

    const handleCancel = () => {
        // Redirect to a specific route (listing page)
        router.visit("/rawMaterials");
    };

    // Filter out duplicate raw materials by name
    const uniqueRawMaterials = rawMaterials.filter(
        (rm, index, self) =>
            index === self.findIndex((r) => r.name === rm.name)
    );

    return (
        <AppLayout>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-4 bg-white rounded shadow"
            >
                <h1 className="text-xl font-bold mb-4">Record Raw Material Supply</h1>

                {/* Bakery Selection */}
                <div className="mb-3">
                    <label className="block mb-1">Bakery</label>
                    <select
                        name="bakery_id"
                        value={form.bakery_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Bakery</option>
                        {bakeries.map((bakery) => (
                            <option key={bakery.id} value={bakery.id}>
                                {bakery.name}
                            </option>
                        ))}
                    </select>
                    {errors.bakery_id && (
                        <p className="text-red-600">{errors.bakery_id[0]}</p>
                    )}
                </div>

                {/* Raw Material Selection */}
                <div className="mb-3">
                    <label className="block mb-1">Raw Material</label>
                    <select
                        name="raw_material_id"
                        value={form.raw_material_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Raw Material</option>
                        {uniqueRawMaterials.map((rm) => (
                            <option key={rm.id} value={rm.id}>
                                {rm.name}
                            </option>
                        ))}
                    </select>
                    {errors.raw_material_id && (
                        <p className="text-red-600">{errors.raw_material_id[0]}</p>
                    )}
                </div>

                {/* Quantity Input */}
                <div className="mb-3">
                    <label className="block mb-1">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        min="0.001"
                        step="0.001"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.quantity && (
                        <p className="text-red-600">{errors.quantity[0]}</p>
                    )}
                </div>

                {/* Measurement Unit Selection */}
                <div className="mb-3">
                    <label className="block mb-1">Measurement Unit</label>
                    <select
                        name="measurement_unit"
                        value={form.measurement_unit}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Unit</option>
                        <option value="kg">kg</option>
                        <option value="litre">litre</option>
                    </select>
                    {errors.measurement_unit && (
                        <p className="text-red-600">{errors.measurement_unit[0]}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Record Supply
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AppLayout>
    );
};

export default Supply;
