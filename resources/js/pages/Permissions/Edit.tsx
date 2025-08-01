// resources/js/pages/Permissions/Edit.tsx

import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface Props {
    permission: Permission;
}

export default function Edit() {
    // Get the permission from Inertia page props
    const { permission } = usePage<Props>().props;

    const [name, setName] = useState(permission.name);
    const [guardName, setGuardName] = useState(permission.guard_name);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Permissions', href: '/permissions' },
        { title: 'Edit Permission', href: `/permissions/${permission.id}/edit` },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(`/permissions/${permission.id}`, {
            name,
            guard_name: guardName,
        }, {
            onError: (errors) => setErrors(errors),
            onSuccess: () => {
                // Optionally redirect or show success message
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Permission: ${permission.name}`} />

            <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-6">Edit Permission</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="guard_name" className="block font-medium mb-1">
                            Guard Name
                        </label>
                        <input
                            id="guard_name"
                            type="text"
                            value={guardName}
                            onChange={e => setGuardName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.guard_name && <p className="text-red-600 mt-1">{errors.guard_name}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
