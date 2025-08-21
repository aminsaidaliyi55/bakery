import React, { ChangeEvent, FormEvent } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Props {
    categories: { id: number; name: string }[];
}

const Create: React.FC<Props> = ({ categories }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        category_id: "",
        price: "",
        description: "",
        image: null as File | null,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (e.target.type === "file") {
            setData("image", (e.target as HTMLInputElement).files?.[0] || null);
        } else {
            setData(e.target.name as keyof typeof data, e.target.value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category_id", data.category_id);
        formData.append("price", data.price);
        formData.append("description", data.description);
        if (data.image) formData.append("image", data.image);

        post("/products", { data: formData });
    };

    return (
        <AppLayout>
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Add Product</h1>

                {/* Name */}
                <div className="mb-3">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>

                {/* Category */}
                <div className="mb-3">
                    <label className="block mb-1">Category</label>
                    <select
                        name="category_id"
                        value={data.category_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-600">{errors.category_id}</p>}
                </div>

                {/* Price */}
                <div className="mb-3">
                    <label className="block mb-1">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.price && <p className="text-red-600">{errors.price}</p>}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.description && <p className="text-red-600">{errors.description}</p>}
                </div>

                {/* Image */}
                <div className="mb-3">
                    <label className="block mb-1">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />
                    {errors.image && <p className="text-red-600">{errors.image}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create Product
                    </button>
                    <Link
                        href="/products"
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
