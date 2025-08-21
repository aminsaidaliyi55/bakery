import React, { useState, ChangeEvent, FormEvent } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Employee {
    id: number;
    user: { name: string };
}

interface Bakery {
    id: number;
    name: string;
}

interface Props {
    employees: Employee[];
    bakeries: Bakery[];
}

interface FormData {
    employee_id: string;
    bakery_id: string;
    amount: string;
    description: string;
}

const Create: React.FC<Props> = ({ employees, bakeries }) => {
    const [form, setForm] = useState<FormData>({
        employee_id: '',
        bakery_id: '',
        amount: '',
        description: '',
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        router.post('/employee-expenses', form, {
            onSuccess: () => alert('Expense recorded successfully!'),
            onError: (errs) => setErrors(errs),
        });
    };

    return (
        <AppLayout>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Add Employee Expense</h1>

                <div className="mb-3">
                    <label className="block mb-1">Employee</label>
                    <select
                        name="employee_id"
                        value={form.employee_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.user.name}
                            </option>
                        ))}
                    </select>
                    {errors.employee_id && <p className="text-red-600">{errors.employee_id[0]}</p>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Bakery</label>
                    <select
                        name="bakery_id"
                        value={form.bakery_id}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Bakery</option>
                        {bakeries.map((bakery) => (
                            <option key={bakery.id} value={bakery.id}>
                                {bakery.name}
                            </option>
                        ))}
                    </select>
                    {errors.bakery_id && <p className="text-red-600">{errors.bakery_id[0]}</p>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        min="0"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    {errors.amount && <p className="text-red-600">{errors.amount[0]}</p>}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">Description (optional)</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        rows={3}
                    />
                    {errors.description && <p className="text-red-600">{errors.description[0]}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save Expense
                </button>
            </form>
        </AppLayout>
    );
};

export default Create;
