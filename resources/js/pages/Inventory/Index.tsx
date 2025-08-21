import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: string;
    name: string;
}

interface Inventory {
    id: string;
    product: Product;
    quantity: number;
    unit: string;
    status: string;
    created_at: string;
}

interface Props extends PageProps {
    inventories: {
        data: Inventory[];
        current_page: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

const InventoryIndex: React.FC<Props> = ({ inventories }) => {
    return (
        <AppLayout title="Inventory">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Inventory</h1>
                    <Link
                        href={route('inventory.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Inventory
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 text-left text-sm font-semibold">
                        <tr>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Unit</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Created</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-200">
                        {inventories.data.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-2">{item.product?.name}</td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2">{item.unit}</td>
                                <td className="px-4 py-2 capitalize">{item.status}</td>
                                <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <Link
                                        href={route('inventory.edit', item.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={route('inventory.destroy', item.id)}
                                        className="text-red-600 hover:underline"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this item?')) {
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

                {/* Pagination */}
                <div className="mt-4 flex justify-center space-x-1">
                    {inventories.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            className={`px-3 py-1 rounded ${
                                link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default InventoryIndex;
