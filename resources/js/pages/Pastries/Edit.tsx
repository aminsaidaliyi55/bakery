import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Category {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Pastry {
    id: number;
    name: string;
    description?: string;
    price: number;
    sku: string;
    image?: string;
    stock_quantity: number;
    category_id: number;
    bakery_id: number;
    status: "available" | "out-of-stock";
}

interface Props {
    pastry: Pastry;
    categories: Category[];
    bakeries: Bakery[];
}

const Edit: React.FC<Props> = ({ pastry, categories, bakeries }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: pastry.name,
        description: pastry.description || "",
        price: pastry.price.toString(),
        sku: pastry.sku,
        image: pastry.image || "",
        stock_quantity: pastry.stock_quantity.toString(),
        category_id: pastry.category_id.toString(),
        bakery_id: pastry.bakery_id.toString(),
        status: pastry.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pastries/${pastry.id}`);
    };

    return (
        <AppLayout title={`Edit Pastry: ${pastry.name}`}>
            <Head title={`Edit Pastry: ${pastry.name}`} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Edit Pastry</h1>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <label className="block mb-2 font-semibold">Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.name && <div className="text-red-600 mb-2">{errors.name}</div>}

                    {/* Description */}
                    <label className="block mb-2 font-semibold">Description:</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        rows={3}
                    />

                    {/* Price */}
                    <label className="block mb-2 font-semibold">Price:</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.price && <div className="text-red-600 mb-2">{errors.price}</div>}

                    {/* SKU */}
                    <label className="block mb-2 font-semibold">SKU:</label>
                    <input
                        type="text"
                        value={data.sku}
                        onChange={(e) => setData("sku", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.sku && <div className="text-red-600 mb-2">{errors.sku}</div>}

                    {/* Image URL */}
                    <label className="block mb-2 font-semibold">Image URL:</label>
                    <input
                        type="text"
                        value={data.image}
                        onChange={(e) => setData("image", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />

                    {/* Stock Quantity */}
                    <label className="block mb-2 font-semibold">Stock Quantity:</label>
                    <input
                        type="number"
                        min="0"
                        value={data.stock_quantity}
                        onChange={(e) => setData("stock_quantity", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.stock_quantity && (
                        <div className="text-red-600 mb-2">{errors.stock_quantity}</div>
                    )}

                    {/* Category Select */}
                    <label className="block mb-2 font-semibold">Category:</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <div className="text-red-600 mb-2">{errors.category_id}</div>
                    )}

                    {/* Bakery Select */}
                    <label className="block mb-2 font-semibold">Bakery:</label>
                    <select
                        value={data.bakery_id}
                        onChange={(e) => setData("bakery_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    >
                        <option value="">Select a bakery</option>
                        {bakeries.map((bakery) => (
                            <option key={bakery.id} value={bakery.id.toString()}>
                                {bakery.name}
                            </option>
                        ))}
                    </select>
                    {errors.bakery_id && (
                        <div className="text-red-600 mb-2">{errors.bakery_id}</div>
                    )}

                    {/* Status */}
                    <label className="block mb-2 font-semibold">Status:</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    >
                        <option value="available">Available</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                    {errors.status && <div className="text-red-600 mb-2">{errors.status}</div>}

                    {/* Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <Link href="/pastries" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
