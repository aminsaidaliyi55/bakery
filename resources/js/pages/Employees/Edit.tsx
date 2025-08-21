import React, { useState, ChangeEvent, FormEvent } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface User {
    id: number;
    name: string;
}

interface Bakery {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    user_id: number;
    bakery_id: number;
    role: string;
    salary: number;
    hired_at: string;
    status: string;
    notes?: string;
}

interface Props {
    users: User[];
    bakeries: Bakery[];
    employee: Employee;
}

const Edit: React.FC<Props> = ({ users, bakeries, employee }) => {
    const [form, setForm] = useState({
        user_id: employee.user_id.toString(),
        bakery_id: employee.bakery_id.toString(),
        role: employee.role || "",
        salary: employee.salary.toString(),
        hired_at: employee.hired_at || "",
        status: employee.status || "",
        notes: employee.notes || "",
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.put(`/employees/${employee.id}`, form, {
            onSuccess: () => alert("Employee updated successfully!"),
            onError: (errs) => setErrors(errs),
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <AppLayout>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">User</label>
                    <select
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    {errors.user_id && <p className="text-red-600 mt-1">{errors.user_id[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bakery</label>
                    <select
                        name="bakery_id"
                        value={form.bakery_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Bakery</option>
                        {bakeries.map(bakery => (
                            <option key={bakery.id} value={bakery.id}>{bakery.name}</option>
                        ))}
                    </select>
                    {errors.bakery_id && <p className="text-red-600 mt-1">{errors.bakery_id[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="e.g., Baker, Cleaner"
                    />
                    {errors.role && <p className="text-red-600 mt-1">{errors.role[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        step="0.01"
                        min="0"
                    />
                    {errors.salary && <p className="text-red-600 mt-1">{errors.salary[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Hired At</label>
                    <input
                        type="date"
                        name="hired_at"
                        value={form.hired_at}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.hired_at && <p className="text-red-600 mt-1">{errors.hired_at[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="on_leave">On Leave</option>
                        <option value="terminated">Terminated</option>
                    </select>
                    {errors.status && <p className="text-red-600 mt-1">{errors.status[0]}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Notes</label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        rows={3}
                        placeholder="Optional notes"
                    />
                    {errors.notes && <p className="text-red-600 mt-1">{errors.notes[0]}</p>}
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Employee
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AppLayout>
    );
};

export default Edit;
