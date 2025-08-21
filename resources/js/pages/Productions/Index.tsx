import React from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Production {
    id: number;
    product_name: string;
    quantity: number;
    production_date: string;
    status: string;
}

interface PageProps {
    productions: Production[];
}

const Index: React.FC = () => {
    const { productions } = usePage<PageProps>().props;

    return (
        <AppLayout title="Productions">
            <Head title="Production List" />

            <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Productions List</h1>
                    <Link
                        href="/productions/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        + New Production
                    </Link>
                </div>

                {productions.length === 0 ? (
                    <p>No production records found.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 rounded">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Product</th>
                            <th className="border p-2 text-left">Quantity</th>
                            <th className="border p-2 text-left">Production Date</th>
                            <th className="border p-2 text-left">Status</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productions.map((prod) => (
                            <tr key={prod.id} className="hover:bg-gray-50">
                                <td className="border p-2">{prod.product_name}</td>
                                <td className="border p-2">{prod.quantity}</td>
                                <td className="border p-2">
                                    {new Date(prod.production_date).toLocaleDateString()}
                                </td>
                                <td className="border p-2 capitalize">{prod.status}</td>
                                <td className="border p-2">
                                    <Link
                                        href={`/productions/${prod.id}`}
                                        className="text-blue-600 hover:underline mr-2"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/productions/${prod.id}/edit`}
                                        className="text-green-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
