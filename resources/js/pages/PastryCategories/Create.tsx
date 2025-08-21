import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage, Link } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface Bakery {
    id: number;
    name: string;
}

interface PageProps {
    bakeries: Bakery[];
}

const Create: React.FC = () => {
    const { bakeries } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        unit: "kg",
        bakery_id: bakeries.length > 0 ? bakeries[0].id : null,
        image: null as File | null,
        is_active: true,
    });

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (data.image) {
            const objectUrl = URL.createObjectURL(data.image);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [data.image]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("pastry-categories.store"), {
            onSuccess: () => reset("image"),
        });
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Create Pastry Category</h1>

                <form onSubmit={submit} encType="multipart/form-data" noValidate>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-1">
                            Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            required
                            autoFocus
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-semibold mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${
                                errors.description ? "border-red-500" : "border-gray-300"
                            }`}
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Unit */}
                    <div className="mb-4">
                        <label htmlFor="unit" className="block font-semibold mb-1">
                            Unit <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="unit"
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${
                                errors.unit ? "border-red-500" : "border-gray-300"
                            }`}
                            required
                        >
                            <option value="kg">kg</option>
                            <option value="litre">litre</option>
                            <option value="pcs">pcs</option>
                        </select>
                        {errors.unit && (
                            <p className="text-red-600 text-sm mt-1">{errors.unit}</p>
                        )}
                    </div>

                    {/* Bakery */}
                    <div className="mb-4">
                        <label htmlFor="bakery_id" className="block font-semibold mb-1">
                            Bakery
                        </label>
                        <select
                            id="bakery_id"
                            value={data.bakery_id ?? ""}
                            onChange={(e) =>
                                setData("bakery_id", e.target.value ? Number(e.target.value) : null)
                            }
                            className={`w-full border rounded px-3 py-2 ${
                                errors.bakery_id ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                            <option value="">-- Select Bakery --</option>
                            {bakeries.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                        {errors.bakery_id && (
                            <p className="text-red-600 text-sm mt-1">{errors.bakery_id}</p>
                        )}
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-semibold mb-1">
                            Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setData("image", e.target.files[0]);
                                } else {
                                    setData("image", null);
                                }
                            }}
                            className="w-full"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-28 h-28 object-cover rounded border"
                            />
                        )}
                        {errors.image && (
                            <p className="text-red-600 text-sm mt-1">{errors.image}</p>
                        )}
                    </div>

                    {/* Active */}
                    <div className="mb-4 flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData("is_active", e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="is_active" className="font-semibold">
                            Active
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            {processing ? "Saving..." : "Save Category"}
                        </button>
                        <Link
                            href={route("pastry-categories.index")}
                            className="px-5 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
