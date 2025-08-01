// resources/js/Pages/MaterialTypes/Show.tsx

import React from "react";
import { usePage, Link } from "@inertiajs/react";

interface MaterialType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    materialType: MaterialType;
}

const Show: React.FC = () => {
    const { materialType } = usePage<PageProps>().props;

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Material Type Details</h1>

            <div className="mb-4">
                <strong>Name:</strong> {materialType.name}
            </div>

            <div className="mb-2">
                <strong>Created At:</strong>{" "}
                {new Date(materialType.created_at).toLocaleString()}
            </div>

            <div className="mb-6">
                <strong>Last Updated:</strong>{" "}
                {new Date(materialType.updated_at).toLocaleString()}
            </div>

            <Link
                href="/material-types"
                className="inline-block bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
                Back to List
            </Link>
        </div>
    );
};

export default Show;
