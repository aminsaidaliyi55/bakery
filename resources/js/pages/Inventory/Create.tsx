import React, { useState, FormEvent } from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

interface Product {
    id: string;
    name: string;
}

interface Props extends PageProps {
    products: Product[];
}

const Create: React.FC<Props> = ({ products }) => {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        quantity: '',
        unit: '',
        status: 'pending',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('inventory.store'));
    };

    return (
        <AppLayout title="Add Inventory">
            <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold">Add New Inventory</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* products */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product</label>
                        <select
                            value={data.product_id}
                            onChange={e => setData('product_id', e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                        >
                            <option value="">-- Select Product --</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        {errors.product_id && <div className="text-red-500 text-sm">{errors.product_id}</div>}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            placeholder="Enter quantity"
                        />
                        {errors.quantity && <div className="text-red-500 text-sm">{errors.quantity}</div>}
                    </div>

                    {/* Unit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit (kg, liter, etc)</label>
                        <input
                            type="text"
                            value={data.unit}
                            onChange={e => setData('unit', e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            placeholder="e.g., kg, liter"
                        />
                        {errors.unit && <div className="text-red-500 text-sm">{errors.unit}</div>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <Link
                            href={route('inventory.index')}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
