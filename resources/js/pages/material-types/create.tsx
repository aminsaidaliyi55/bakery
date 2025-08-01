// resources/js/Pages/MaterialTypes/Create.tsx

import React, { useState, FormEvent } from "react";
import { router } from "@inertiajs/react";

const Create: React.FC = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<{ name?: string }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        router.post("/material-types", { name }, {
            onError: (errorBag) => {
                setErrors(errorBag);
            },
        });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create Material Type</h1>

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
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
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

export default Create;
