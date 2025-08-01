import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface PageProps {
    permissions: Permission[];
}

const Create: React.FC = () => {
    const { permissions } = usePage<PageProps>().props;

    const [form, setForm] = useState({
        name: "",
        guard_name: "web",
        permissions: [] as number[], // store selected permission IDs
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Handle input changes for name and guard_name
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle checkbox toggle for permissions
    const handlePermissionToggle = (permissionId: number) => {
        setForm((prev) => {
            const hasPermission = prev.permissions.includes(permissionId);
            if (hasPermission) {
                // remove it
                return {
                    ...prev,
                    permissions: prev.permissions.filter((id) => id !== permissionId),
                };
            } else {
                // add it
                return {
                    ...prev,
                    permissions: [...prev.permissions, permissionId],
                };
            }
        });
    };

    // Submit form data to Laravel backend
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        router.post("/roles", form, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Create Role</h1>

            <form onSubmit={handleSubmit}>
                {/* Role Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Role Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Guard Name */}
                <div className="mb-4">
                    <label htmlFor="guard_name" className="block text-sm font-medium text-gray-700">
                        Guard Name
                    </label>
                    <input
                        type="text"
                        name="guard_name"
                        value={form.guard_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.guard_name && <p className="text-red-500 text-sm mt-1">{errors.guard_name}</p>}
                </div>

                {/* Permissions */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                    <div className="max-h-48 overflow-y-auto border rounded p-2">
                        {permissions.length === 0 && <p className="text-gray-500">No permissions available.</p>}
                        {permissions.map((perm) => (
                            <label key={perm.id} className="flex items-center space-x-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={form.permissions.includes(perm.id)}
                                    onChange={() => handlePermissionToggle(perm.id)}
                                    className="form-checkbox"
                                />
                                <span>{perm.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>}
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Save Role
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
