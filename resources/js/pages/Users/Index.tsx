import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

interface Role {
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface PageProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
    };
}

const Index: React.FC = () => {
    const { users, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || "");

    // Handle form submit: send search param to server
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout>
        <div className="p-6 max-w-6xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <div className="mb-4 flex justify-between items-center">
                <form onSubmit={handleSearch} className="flex space-x-2">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>

                <Link
                    href="/users/create"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Create User
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Roles</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.data.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4 text-gray-500">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        users.data.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    {user.roles.length > 0
                                        ? user.roles.map((role) => role.name).join(", ")
                                        : "—"}
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/users/${user.id}/edit`}
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
            {users.last_page > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/users?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                            className={`px-3 py-1 rounded text-sm ${
                                page === users.current_page
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                </div>
            )}
        </div>
        </AppLayout>
    );
};

export default Index;
