import React from "react";
import { usePage } from "@inertiajs/react";

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions: Permission[];
}

interface PageProps {
    role: Role;
}

const Show: React.FC = () => {
    const { role } = usePage<PageProps>().props;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Role Details</h1>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Role Name</h2>
                <p className="mt-1 text-gray-800">{role.name}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Guard Name</h2>
                <p className="mt-1 text-gray-800">{role.guard_name}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Permissions</h2>
                {role.permissions.length === 0 ? (
                    <p className="text-gray-500 mt-1">No permissions assigned.</p>
                ) : (
                    <ul className="list-disc list-inside mt-1 max-h-48 overflow-y-auto border rounded p-2">
                        {role.permissions.map((perm) => (
                            <li key={perm.id} className="text-gray-700">
                                {perm.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Show;
