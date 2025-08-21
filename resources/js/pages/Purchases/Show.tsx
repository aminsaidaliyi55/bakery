import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Supplier {
    id: number;
    name: string;
}

interface RawMaterial {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Purchase {
    id: number;
    supplier: Supplier;
    rawMaterial: RawMaterial;
    bakery: Bakery;
    quantity: number;
    price_per_unit: number;
    total_price: number;
    purchase_date: string;
    status: string;
    notes?: string;
}

interface Props {
    purchase: Purchase;
}

const Show: React.FC<Props> = ({ purchase }) => {
    return (
        <AppLayout title={`Purchase #${purchase.id}`}>
            <Head title={`Purchase #${purchase.id}`} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-6">Purchase Details</h1>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <strong>Supplier:</strong> {purchase.supplier.name}
                    </div>
                    <div>
                        <strong>Raw Material:</strong> {purchase.rawMaterial.name}
                    </div>
                    <div>
                        <strong>Bakery:</strong> {purchase.bakery.name}
                    </div>
                    <div>
                        <strong>Quantity:</strong> {purchase.quantity}
                    </div>
                    <div>
                        <strong>Price per Unit:</strong> ${purchase.price_per_unit.toFixed(2)}
                    </div>
                    <div>
                        <strong>Total Price:</strong> ${purchase.total_price.toFixed(2)}
                    </div>
                    <div>
                        <strong>Purchase Date:</strong>{" "}
                        {new Date(purchase.purchase_date).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Status:</strong> {purchase.status}
                    </div>
                    <div>
                        <strong>Notes:</strong>
                        <p className="whitespace-pre-line">{purchase.notes || "-"}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href="/purchases"
                        className="inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Back to Purchases
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
