import React from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description?: string;
    image_path?: string;
}

interface Props {
    products: Product[];
}

const Index: React.FC<Props> = () => {
    const { products } = usePage<{ products: Product[] }>().props;

    return (
        <AppLayout>
            <Head title="Products" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link
                        href="/products/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="bg-white shadow rounded overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.image_path ? (
                                            <img
                                                src={`/storage/${product.image_path}`}
                                                alt={product.name}
                                                className="h-10 w-10 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="text-blue-600 hover:underline mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <form
                                            method="POST"
                                            action={`/products/${product.id}`}
                                            className="inline"
                                        >
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="DELETE"
                                            />
                                            <button
                                                type="submit"
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
