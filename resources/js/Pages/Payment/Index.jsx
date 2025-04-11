import React from 'react';
import { Link, useForm } from '@inertiajs/react';
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
    const handleSearch = (e) => {
        e.preventDefault();
        get(route('payements.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const getMonth = (monthNumber) => {
        return monthNames[monthNumber - 1]
    }

    const getFormatedDate = (dateString) => {
        let date = moment(dateString).format('DD/MM/YYYY')
        return date;
    }

    return (
        <>
            <Head title="All payments"/>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold">Payments history</h1>

                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto"
                    >
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Search"
                            className="border px-3 py-2 rounded w-full sm:w-64"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <Link
                            href={route('add-payment')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
                        >
                            Add Payment
                        </Link>
                    </div>
                </div>

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border text-center">Member name</th>
                        <th className="p-2 border text-center">Payment month</th>
                        <th className="p-2 border text-center">Payment year</th>
                        <th className="p-2 border text-center">Payment recorded at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.data.map((payment) => (
                        <tr key={payment.id}>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{payment.member.name}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{getMonth(payment.month)}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{payment.year}</div>
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
