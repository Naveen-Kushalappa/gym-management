import React, {useEffect, useState} from 'react';
import {Link, router, useForm} from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Index = ({ members, filters }) => {
    const { data, setData, get, delete: destroy } = useForm({
        search: filters.search || ''
    });
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this member?')) {
            destroy(route('members.destroy', id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('members.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const [paidFilterState, setPaidFilterState]  = useState(null)

    useEffect(() => {
        if (paidFilterState !== null) {
            router.get(
                route('members.index'),
                { unPaidMembers: paidFilterState },
                { preserveState: true, replace: true }
            );
        }
    }, [paidFilterState]);

    const getTimeSlotLabel = (timeSlot) => {
        if(timeSlot){
            return timeSlot.start_time + '-' + timeSlot.end_time;
        }else {
            return 'N/A';
        }
    }

    return (
        <>
            <Head title="Manage Members"/>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold">Manage Members</h1>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-4">
                    <button
                        type="submit"
                        onClick={() => setPaidFilterState('all')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                    >
                        All
                    </button>
                        <button
                            type="submit"
                            onClick={() => setPaidFilterState(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
                        >
                            Unpaid
                        </button>

                        <button
                            type="submit"
                            onClick={() => setPaidFilterState(false)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            Paid
                        </button>

                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto"
                    >
                        <input
                            type="text"
                            name="search"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Search by name/email"
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
                            href={route('members.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                        >
                            + Member
                        </Link>
                        <Link
                            href={route('add-payment')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
                        >
                            + Payment
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border text-center">Name</th>
                        <th className="p-2 border text-center">Payment status</th>
                        <th className="p-2 border text-center">Time slot</th>
                        <th className="p-2 border text-center">Gender</th>
                        <th className="p-2 border text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.data.map((member) => (
                        <tr key={member.id}>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{member.name}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">
                                    <Link href={route('payments', { search: member.id})}>
                                        <button className={`${member.has_paid_this_month ? 'bg-green-500' : 'bg-red-600' }  text-white px-4 py-2 rounded`}>
                                            {member.has_paid_this_month ? 'Paid' : 'UnPaid'}
                                        </button>
                                    </Link>
                                </div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{getTimeSlotLabel(member.time_slot)}</div>
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{member.gender}</div>
                            </td>
                            <td className="p-2 border space-x-2">
                                <div className="flex justify-center items-center space-x-2">

                                    <Link
                                        href={route('members.edit', member.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {members.data.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-4">
                                No members found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {members.links.map((link, index) => (
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
    );
}

export default Index;

Index.layout = (page) => <AuthenticatedLayout children={page} />;
