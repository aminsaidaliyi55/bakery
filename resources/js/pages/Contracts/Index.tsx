import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

interface Supplier {
    id: string;
    name: string;
}

interface Contract {
    id: string;
    title: string;
    description: string | null;
    supplier: Supplier;
    start_date: string;
    end_date: string;
    status: 'active' | 'expired' | 'pending';
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props extends PageProps {
    contracts: {
        data: Contract[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
}

const ContractIndex: React.FC<Props> = ({ contracts }) => {
    return (
        <AppLayout title="Contracts">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Contract List</h1>
                    <Link
                        href={route('contracts.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Contract
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-left font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Supplier</th>
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">End Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {contracts.data.map((contract) => (
                            <tr key={contract.id}>
                                <td className="px-4 py-2">{contract.title}</td>
                                <td className="px-4 py-2">{contract.supplier?.name ?? 'N/A'}</td>
                                <td className="px-4 py-2">{contract.start_date}</td>
                                <td className="px-4 py-2">{contract.end_date}</td>
                                <td className="px-4 py-2 capitalize">{contract.status}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <Link
                                        href={route('contracts.show', contract.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('contracts.edit', contract.id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={route('contracts.destroy', contract.id)}
                                        className="text-red-600 hover:underline"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this contract?')) {
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
                <div className="mt-6 flex justify-center gap-1">
                    {contracts.links.map((link, index) => (
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

export default ContractIndex;
