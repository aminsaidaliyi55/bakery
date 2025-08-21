import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Props {
    products: Product[];
    userId: number; // current user ID, passed from backend
}

const Create: React.FC<Props> = ({ products, userId }) => {
    const { data, setData, post, processing, errors } = useForm({
        user_id: userId,
        product_id: "",
        quantity: 1,
        price: 0,
        status: "pending",
    });

    // Update price automatically when product changes
    React.useEffect(() => {
        if (data.product_id) {
            const selected = products.find(p => p.id === Number(data.product_id));
            if (selected) {
                setData("price", selected.price);
            }
        }
    }, [data.product_id, products, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/carts");
    };

    return (
        <AppLayout title="Add to Cart">
            <Head title="Add to Cart" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Add Product to Cart</h1>

                <form onSubmit={handleSubmit}>
                    {/* products Selection */}
                    <label className="block mb-2 font-semibold">Product:</label>
                    <select
                        value={data.product_id}
                        onChange={e => setData("product_id", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        required
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} (${product.price.toFixed(2)})
                            </option>
                        ))}
                    </select>
                    {errors.product_id && <div className="text-red-600 mb-2">{errors.product_id}</div>}

                    {/* Quantity */}
                    <label className="block mb-2 font-semibold">Quantity:</label>
                    <input
                        type="number"
                        min={1}
                        value={data.quantity}
                        onChange={e => setData("quantity", Number(e.target.value))}
                        className="w-full border rounded p-2 mb-2"
                        required
                    />
                    {errors.quantity && <div className="text-red-600 mb-2">{errors.quantity}</div>}

                    {/* Price (readonly, set from product) */}
                    <label className="block mb-2 font-semibold">Price per unit:</label>
                    <input
                        type="number"
                        value={data.price}
                        readOnly
                        className="w-full border rounded p-2 mb-2 bg-gray-100 cursor-not-allowed"
                    />

                    {/* Status */}
                    <label className="block mb-2 font-semibold">Status:</label>
                    <input
                        type="text"
                        value={data.status}
                        onChange={e => setData("status", e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    />
                    {errors.status && <div className="text-red-600 mb-2">{errors.status}</div>}

                    {/* Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                        <Link href="/carts" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
