import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Supplier {
    id: number;
    name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    notes?: string;
}

interface Props {
    supplier: Supplier;
}

const Show: React.FC<Props> = ({ supplier }) => {
    return (
        <AppLayout title={`Supplier: ${supplier.name}`}>
            <Head title={supplier.name} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-6">{supplier.name}</h1>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <strong>Contact Person:</strong> {supplier.contact_person || "-"}
                    </div>
                    <div>
                        <strong>Email:</strong> {supplier.email || "-"}
                    </div>
                    <div>
                        <strong>Phone:</strong> {supplier.phone || "-"}
                    </div>
                    <div>
                        <strong>Address:</strong> {supplier.address || "-"}
                    </div>
                    <div>
                        <strong>City:</strong> {supplier.city || "-"}
                    </div>
                    <div>
                        <strong>Country:</strong> {supplier.country || "-"}
                    </div>
                    <div>
                        <strong>Notes:</strong>
                        <p className="whitespace-pre-line">{supplier.notes || "-"}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href="/suppliers"
                        className="inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Back to Suppliers
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
