import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface PastryCategory {
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
    status: 'available' | 'out-of-stock';
    category: PastryCategory;
    bakery: Bakery;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    pastries: {
        data: Pastry[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Index: React.FC<Props> = ({ pastries }) => {
    return (
        <AppLayout title="Pastries">
            <Head title="Pastries List" />

            <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Pastries</h1>
                    <Link
                        href={route('pastries.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Pastry
                    </Link>
                </div>

                {pastries.data.length === 0 ? (
                    <p>No pastries found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded">
                            <thead className="bg-gray-100 text-left font-semibold text-gray-700">
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Category</th>
                                <th className="border px-4 py-2">Bakery</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">SKU</th>
                                <th className="border px-4 py-2">Stock</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pastries.data.map((pastry) => (
                                <tr key={pastry.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{pastry.name}</td>
                                    <td className="border px-4 py-2">{pastry.category?.name ?? 'N/A'}</td>
                                    <td className="border px-4 py-2">{pastry.bakery?.name ?? 'N/A'}</td>
                                    <td className="border px-4 py-2">${pastry.price.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{pastry.sku}</td>
                                    <td className="border px-4 py-2">{pastry.stock_quantity}</td>
                                    <td className="border px-4 py-2 capitalize">{pastry.status}</td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <Link
                                            href={route('pastries.show', pastry.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('pastries.edit', pastry.id)}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route('pastries.destroy', pastry.id)}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure you want to delete this pastry?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-1">
                    {pastries.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 rounded ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
