import React, {useState} from 'react';
import {Link, router, useForm} from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import moment from 'moment';

const Index = ({ payments, filters }) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const { data, setData, get } = useForm({
        search: filters.search || ''
    });

    const getMonth = (monthNumber) => {
        return monthNames[monthNumber - 1]
    }

    const getFormatedDate = (dateString) => {
        let date = moment(dateString).format('DD/MM/YYYY')
        return date;
    }

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('payments'), { month, year, search: data.search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="All payments"/>
            <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-center sm:text-left mb-4">Payments</h1>

                    {/* Action Links */}
                    <div className="flex gap-2 justify-center sm:justify-end">
                        <Link
                            href={route('add-payment')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
                        >
                            Add payment
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">

                    <form
                        onSubmit={handleFilter}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto"
                    >
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Search by name/email/mode"
                            className="border px-3 py-2 rounded w-full sm:w-64"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            Search
                        </button>
                        {data.search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setData('search', '');
                                    handleFilter({ preventDefault: () => {} }); // optional: auto re-submit
                                }}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full sm:w-auto"
                            >
                                Clear
                            </button>
                        )}
                    </form>

                    <form onSubmit={handleFilter}
                          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">

                        <select
                            className="border p-2 pr-2 rounded w-full sm:w-32"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">All Months</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border p-2 pr-4 rounded w-full sm:w-28"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {[...Array(5)].map((_, i) => {
                                const y = new Date().getFullYear() - i;
                                return <option key={y} value={y}>{y}</option>;
                            })}
                        </select>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Filter
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto w-full">

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border text-center">Member name</th>
                        <th className="p-2 border text-center">Month</th>
                        <th className="p-2 border text-center">Year</th>
                        <th className="p-2 border text-center">Amount</th>
                        <th className="p-2 border text-center">Payment mode</th>
                        <th className="p-2 border text-center">Payment recorded at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.data.map((payment) => (
                        <tr key={payment.id}>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center"
                                     title={payment.comments}>
                                    {payment.member.name}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{getMonth(payment.month)}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{payment.year}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{payment.amount}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{payment.mode}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{getFormatedDate(payment.created_at)}</div>
                            </td>
                        </tr>
                    ))}
                    {payments.data.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No payments found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {payments.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && Inertia.visit(link.url)}
                            className={`px-3 py-1 rounded border ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-200 text-gray-700'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

        </>
    )



}

Index.layout = (page) => <AuthenticatedLayout children={page} />;

export default Index;
