import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface User {
    id: number;
    name: string;
}

interface Cart {
    id: number;
    product: Product;
    user: User;
    quantity: number;
    price: number;
    total_price: number;
    status: string;
}

interface Props {
    cart: Cart;
}

const Show: React.FC<Props> = ({ cart }) => {
    return (
        <AppLayout title={`Cart Item #${cart.id}`}>
            <Head title={`Cart Item #${cart.id}`} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-6">Cart Item Details</h1>

                <div className="mb-4 space-y-2 text-gray-700">
                    <div>
                        <strong>Product:</strong> {cart.product.name}
                    </div>
                    <div>
                        <strong>User:</strong> {cart.user.name}
                    </div>
                    <div>
                        <strong>Quantity:</strong> {cart.quantity}
                    </div>
                    <div>
                        <strong>Price per unit:</strong> ${cart.price.toFixed(2)}
                    </div>
                    <div>
                        <strong>Total price:</strong> ${cart.total_price.toFixed(2)}
                    </div>
                    <div>
                        <strong>Status:</strong> {cart.status}
                    </div>
                </div>

                <div className="flex space-x-4">
                    <Link
                        href="/carts"
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Back to Cart
                    </Link>
                    <Link
                        href={`/carts/${cart.id}/edit`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
