// resources/js/Pages/MaterialTypes/Edit.tsx

import React, { useState, FormEvent } from "react";
import { router, usePage } from "@inertiajs/react";

interface MaterialType {
    id: number;
    name: string;
}

interface PageProps {
    materialType: MaterialType;
    errors: {
        name?: string;
    };
}

const Edit: React.FC = () => {
    const { materialType, errors } = usePage<PageProps>().props;

    const [name, setName] = useState(materialType.name);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        router.put(`/material-types/${materialType.id}`, { name });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Material Type</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium text-gray-700">
                        Material Type Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors?.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                    <a
                        href="/material-types"
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Edit;
