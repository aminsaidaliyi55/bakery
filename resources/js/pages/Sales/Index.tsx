import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Bakery {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
}

interface Sale {
    id: string;
    bakery: Bakery;
    product: Product;
    quantity: number;
    unit_price: number;
    total_price: number;
    sale_date: string;
    customer_name?: string;
    payment_method?: string;
}

interface PageProps {
    sales: {
        data: Sale[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

const SalesIndex: React.FC = () => {
    const { sales } = usePage<PageProps>().props;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Sales</h1>
                <Link
                    href={route('sales.create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + New Sale
                </Link>
            </div>

            <table className="w-full bg-white border rounded shadow-sm text-sm">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Bakery</th>
                    <th className="p-3 border">Product</th>
                    <th className="p-3 border">Qty</th>
                    <th className="p-3 border">Unit Price</th>
                    <th className="p-3 border">Total Price</th>
                    <th className="p-3 border">Sale Date</th>
                    <th className="p-3 border">Customer</th>
                    <th className="p-3 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sales.data.map((sale) => (
                    <tr key={sale.id} className="border-t">
                        <td className="p-3">{sale.bakery?.name}</td>
                        <td className="p-3">{sale.product?.name}</td>
                        <td className="p-3">{sale.quantity}</td>
                        <td className="p-3">Br {sale.unit_price.toFixed(2)}</td>
                        <td className="p-3">Br {sale.total_price.toFixed(2)}</td>
                        <td className="p-3">{sale.sale_date}</td>
                        <td className="p-3">{sale.customer_name ?? '-'}</td>
                        <td className="p-3 flex gap-2">
                            <Link
                                href={route('sales.show', sale.id)}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                            <Link
                                href={route('sales.edit', sale.id)}
                                className="text-green-600 hover:underline"
                            >
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex space-x-2">
                {sales.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        className={`px-3 py-1 rounded border ${
                            link.active ? 'bg-blue-600 text-white' : 'text-gray-700'
                        } ${!link.url ? 'pointer-events-none text-gray-400' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SalesIndex;
