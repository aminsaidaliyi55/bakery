import React, { useState } from "react";
import { router, Link, usePage } from "@inertiajs/react";

interface Role {
    id: number;
    name: string;
}

interface PageProps {
    roles: Role[];
}

const Create: React.FC = () => {
    const { roles } = usePage<PageProps>().props;

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [] as number[],
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [generalError, setGeneralError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleRole = (roleId: number) => {
        setForm((prev) => {
            if (prev.roles.includes(roleId)) {
                return { ...prev, roles: prev.roles.filter((id) => id !== roleId) };
            } else {
                return { ...prev, roles: [...prev.roles, roleId] };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        router.post("/users", form, {
            onError: (err) => {
                setErrors(err);
            },
            onFailure: (error) => {
                // For server errors or unexpected failures
                setGeneralError("An unexpected error occurred. Please try again.");
            },
            onSuccess: () => {
                // Optional: reset form or notify success here if you want
            },
        });
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create User</h1>

            {generalError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {generalError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Password Confirmation */}
                <div className="mb-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                    )}
                </div>

                {/* Roles */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
                    <div className="max-h-48 overflow-y-auto border rounded p-2">
                        {roles.length === 0 && <p className="text-gray-500">No roles available.</p>}
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center space-x-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={form.roles.includes(role.id)}
                                    onChange={() => toggleRole(role.id)}
                                    className="form-checkbox"
                                />
                                <span>{role.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
                </div>

                {/* Submit */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Create User
                    </button>
                    <Link
                        href="/users"
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Create;
