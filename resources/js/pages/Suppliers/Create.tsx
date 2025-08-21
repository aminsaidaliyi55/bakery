import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

const Create: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/suppliers");
    };

    return (
        <AppLayout title="Create Supplier">
            <Head title="Create Supplier" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Create New Supplier</h1>

                <form onSubmit={handleSubmit}>

                    <label className="block mb-2 font-semibold">Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData("name", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.name && <div className="text-red-600 mb-2">{errors.name}</div>}

                    <label className="block mb-2 font-semibold">Contact Person:</label>
                    <input
                        type="text"
                        value={data.contact_person}
                        onChange={e => setData("contact_person", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.contact_person && <div className="text-red-600 mb-2">{errors.contact_person}</div>}

                    <label className="block mb-2 font-semibold">Email:</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData("email", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.email && <div className="text-red-600 mb-2">{errors.email}</div>}

                    <label className="block mb-2 font-semibold">Phone:</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={e => setData("phone", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />
                    {errors.phone && <div className="text-red-600 mb-2">{errors.phone}</div>}

                    <label className="block mb-2 font-semibold">Address:</label>
                    <textarea
                        value={data.address}
                        onChange={e => setData("address", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                        rows={2}
                    />

                    <label className="block mb-2 font-semibold">City:</label>
                    <input
                        type="text"
                        value={data.city}
                        onChange={e => setData("city", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />

                    <label className="block mb-2 font-semibold">Country:</label>
                    <input
                        type="text"
                        value={data.country}
                        onChange={e => setData("country", e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                    />

                    <label className="block mb-2 font-semibold">Notes:</label>
                    <textarea
                        value={data.notes}
                        onChange={e => setData("notes", e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                        rows={3}
                    />

                    <div className="flex items-center space-x-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <Link href="/suppliers" className="text-gray-700 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
