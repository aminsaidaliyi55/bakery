import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

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
    updated_at: string;
}

interface Props extends PageProps {
    inventory: Inventory;
}

const Show: React.FC<Props> = ({ inventory }) => {
    return (
        <AppLayout title="Inventory Details">
            <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Inventory Details</h1>
                </div>

                <div className="space-y-4 text-sm">
                    <div>
                        <span className="font-medium">Product:</span>{' '}
                        {inventory.product?.name ?? 'N/A'}
                    </div>
                    <div>
                        <span className="font-medium">Quantity:</span>{' '}
                        {inventory.quantity}
                    </div>
                    <div>
                        <span className="font-medium">Unit:</span>{' '}
                        {inventory.unit}
                    </div>
                    <div>
                        <span className="font-medium">Status:</span>{' '}
                        {inventory.status}
                    </div>
                    <div>
                        <span className="font-medium">Created At:</span>{' '}
                        {new Date(inventory.created_at).toLocaleString()}
                    </div>
                    <div>
                        <span className="font-medium">Updated At:</span>{' '}
                        {new Date(inventory.updated_at).toLocaleString()}
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <Link
                        href={route('inventory.edit', inventory.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Edit
                    </Link>

                    <Link
                        href={route('inventory.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
