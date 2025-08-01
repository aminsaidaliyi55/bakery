// resources/js/pages/Permissions/Show.tsx

import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    permission: Permission;
}

export default function Show() {
    // Get the permission from Inertia page props
    const { permission } = usePage<Props>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Permissions', href: '/permissions' },
        { title: 'View Permission', href: `/permissions/${permission.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission: ${permission.name}`} />
            <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-6">Permission Details</h1>

                <div className="mb-4">
                    <strong>ID:</strong> <span>{permission.id}</span>
                </div>
                <div className="mb-4">
                    <strong>Name:</strong> <span>{permission.name}</span>
                </div>
                <div className="mb-4">
                    <strong>Guard Name:</strong> <span>{permission.guard_name}</span>
                </div>
                {permission.created_at && (
                    <div className="mb-4">
                        <strong>Created At:</strong> <span>{new Date(permission.created_at).toLocaleString()}</span>
                    </div>
                )}
                {permission.updated_at && (
                    <div>
                        <strong>Updated At:</strong> <span>{new Date(permission.updated_at).toLocaleString()}</span>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
