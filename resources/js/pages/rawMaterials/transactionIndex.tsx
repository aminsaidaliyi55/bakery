import React from "react";
import { router } from '@inertiajs/react';
import AppLayout from "@/layouts/app-layout";

interface Summary {
    bakery: string;
    raw_material: string;
    total_supplied: number;
    total_used: number;
    balance: number;
    status: 'pending' | 'approved' | 'rejected';
}

interface Props {
    transactions: Summary[];
}

const TransactionIndex: React.FC<Props> = ({ transactions }) => {
    const handleApprove = (bakery: string, rawMaterial: string) => {
        if (confirm(`Approve supply for ${rawMaterial} at ${bakery}?`)) {
            router.post(route('rawMaterials.approve'), {
                bakery,
                raw_material: rawMaterial,
            });
        }
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Raw Material Summary</h1>

                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2">#</th>
                        <th className="border px-3 py-2">Bakery</th>
                        <th className="border px-3 py-2">Raw Material</th>
                        <th className="border px-3 py-2">Total Supplied</th>
                        <th className="border px-3 py-2">Total Used</th>
                        <th className="border px-3 py-2">Balance</th>
                        <th className="border px-3 py-2">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx, index) => (
                        <tr key={index} className="text-center">
                            <td className="border px-3 py-2">{index + 1}</td>
                            <td className="border px-3 py-2">{tx.bakery}</td>
                            <td className="border px-3 py-2">{tx.raw_material}</td>
                            <td className="border px-3 py-2">{tx.total_supplied}</td>
                            <td className="border px-3 py-2">{tx.total_used}</td>
                            <td className="border px-3 py-2">{tx.balance}</td>
                            <td className="border px-3 py-2">
                                {tx.status === 'pending' ? (
                                    <>
                                        <span className="text-yellow-600 font-semibold">Pending</span>
                                        <button
                                            onClick={() => handleApprove(tx.bakery, tx.raw_material)}
                                            className="ml-2 bg-green-600 text-white px-2 py-1 rounded"
                                        >
                                            Approve
                                        </button>
                                    </>
                                ) : (
                                    <span
                                        className={`font-semibold ${
                                            tx.status === 'approved' ? 'text-green-600' : 'text-red-600'
                                        }`}
                                    >
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default TransactionIndex;
