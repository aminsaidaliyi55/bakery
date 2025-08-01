import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
    logo?: string | null;
    location?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    monthly_rent_fee?: string | null;
    status?: string | null;
    owner?: User | null;
    manager?: User | null;
    storekeeper?: User | null;
    dough_mixer?: User | null;
    baker?: User | null;
    helper?: User | null;
    cleaner?: User | null;
    gatekeeper?: User | null;
}

interface PageProps {
    bakeries: {
        data: Bakery[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
    auth_user: {
        id: number;
        name: string;
    };
}

const Index: React.FC = () => {
    const { bakeries, filters, auth_user } = usePage<PageProps>().props;

    // Helper to build logo full URL for Laravel storage (adjust as needed)
    const getLogoUrl = (logo: string | null | undefined) => {
        if (!logo) return null;
        return `/storage/${logo}`;
    };

    // Helper to build pagination URL preserving search filter
    const buildPageUrl = (page: number) => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        params.append('page', String(page));
        return `?${params.toString()}`;
    };

    return (
        <AppLayout>
            <div className="p-6 max-w-full mx-auto bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Bakeries</h1>

                <div className="mb-4 flex justify-between items-center">
                    <Link
                        href="/bakeries/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Create Bakery
                    </Link>
                    <form method="get" action="/bakeries" className="ml-4">
                        <input
                            type="text"
                            name="search"
                            defaultValue={filters.search || ''}
                            placeholder="Search bakeries..."
                            className="border rounded px-3 py-1"
                        />
                        <button
                            type="submit"
                            className="ml-2 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Logo</th>
                            <th className="border px-3 py-2">Location</th>
                            <th className="border px-3 py-2">Longitude</th>
                            <th className="border px-3 py-2">Latitude</th>
                            <th className="border px-3 py-2">Monthly Rent Fee</th>
                            <th className="border px-3 py-2">Status</th>
                            <th className="border px-3 py-2">Owner</th>
                            <th className="border px-3 py-2">Manager</th>
                            <th className="border px-3 py-2">Storekeeper</th>
                            <th className="border px-3 py-2">Dough Mixer</th>
                            <th className="border px-3 py-2">Baker</th>
                            <th className="border px-3 py-2">Helper</th>
                            <th className="border px-3 py-2">Cleaner</th>
                            <th className="border px-3 py-2">Gatekeeper</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bakeries.data.length === 0 ? (
                            <tr>
                                <td colSpan={16} className="text-center p-4 text-gray-500">
                                    No bakeries found.
                                </td>
                            </tr>
                        ) : (
                            bakeries.data.map((bakery) => (
                                <tr key={bakery.id} className="hover:bg-gray-50">
                                    <td className="border px-3 py-2">
                                        {bakery.name}
                                        {bakery.owner?.id === auth_user.id && (
                                            <span className="ml-2 px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded">
                                                    You are the owner
                                                </span>
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {bakery.logo ? (
                                            <img
                                                src={getLogoUrl(bakery.logo)}
                                                alt={`${bakery.name} logo`}
                                                className="w-12 h-12 object-contain"
                                            />
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">{bakery.location || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.longitude ?? '—'}</td>
                                    <td className="border px-3 py-2">{bakery.latitude ?? '—'}</td>
                                    <td className="border px-3 py-2">{bakery.monthly_rent_fee ?? '—'}</td>
                                    <td className="border px-3 py-2">{bakery.status || 'Inactive'}</td>
                                    <td className="border px-3 py-2">{bakery.owner?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.manager?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.storekeeper?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.dough_mixer?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.baker?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.helper?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.cleaner?.name || '—'}</td>
                                    <td className="border px-3 py-2">{bakery.gatekeeper?.name || '—'}</td>
                                    <td className="border px-3 py-2 space-x-2">
                                        <Link
                                            href={`/bakeries/${bakery.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/bakeries/${bakery.id}/edit`}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {bakeries.last_page > 1 && (
                    <div className="mt-6 flex justify-center space-x-2">
                        {Array.from({ length: bakeries.last_page }, (_, i) => i + 1).map(
                            (page) => (
                                <Link
                                    key={page}
                                    href={buildPageUrl(page)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        page === bakeries.current_page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ),
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
