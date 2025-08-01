// resources/js/pages/Permissions/Create.tsx

import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Permissions', href: '/permissions' },
    { title: 'Create', href: '/permissions/create' },
];

export default function Create() {
    // Using Inertia useForm hook for form state & submission
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        guard_name: 'web', // default guard, adjust if needed
    });

    // Handle form submission
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('permissions.store'), {
            onSuccess: () => {
                // Optionally reset the form or redirect
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-6">Create New Permission</h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className={`w-full border rounded px-3 py-2 focus:outline-none ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="guard_name" className="block font-medium mb-1">
                            Guard Name
                        </label>
                        <input
                            id="guard_name"
                            type="text"
                            value={data.guard_name}
                            onChange={e => setData('guard_name', e.target.value)}
                            className={`w-full border rounded px-3 py-2 focus:outline-none ${
                                errors.guard_name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.guard_name && <p className="text-red-600 text-sm mt-1">{errors.guard_name}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Create Permission'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
