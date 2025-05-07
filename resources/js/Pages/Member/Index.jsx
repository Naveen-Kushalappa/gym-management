import React, {useEffect, useState} from 'react';
import {Link, router, useForm, usePage} from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Index = ({ members, filters, orgTimeSlots }) => {

    const user = usePage().props.auth.user;

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
    const [timeSlotFilter, setTimeSlotFilter] = useState("");

    useEffect(() => {
            router.get(
                route('members.index'),
                { timeSlotId: timeSlotFilter},
                { preserveState: true, replace: true }
            );
    }, [timeSlotFilter]);

    return (
        <>
            <Head title="Manage Members"/>
            <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-center sm:text-left mb-4">Members</h1>

                    {/* Action Links */}
                    <div className="flex gap-2 justify-center sm:justify-end">
                        {
                            user.role !== 'member' &&
                            <Link
                                href={route('members.create')}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                            >
                                Add member
                            </Link>
                        }
                        <Link
                            href={route('add-payment')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
                        >
                            Add payment
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between mb-6">

                    {/* Search Form */}
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
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

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full md:w-auto">
                        <select
                            className="border p-2 pr-2 rounded w-full sm:w-48"
                            value={timeSlotFilter}
                            onChange={(e) => setTimeSlotFilter(e.target.value)}
                        >
                            <option value="">All timeslots</option>
                            {orgTimeSlots.map((timeSlot, i) => (
                                <option key={i} value={timeSlot.id}>
                                    {`${timeSlot.start_time} - ${timeSlot.end_time}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={() => setPaidFilterState('all')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            All
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaidFilterState(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
                        >
                            Unpaid
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaidFilterState(false)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                        >
                            Paid
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border text-center">Name</th>
                        <th className="p-2 border text-center">Payment status</th>
                        <th className="p-2 border text-center">{user.role === 'super_admin' ? 'Org name' : 'Time slot'}</th>
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
                                    {user.role !== 'member' || user.id === member.id ? (
                                        <Link href={route('payments', { search: member.id })}>
                                            <button className={`${member.has_paid_this_month ? 'bg-green-500' : 'bg-red-600'} text-white px-4 py-2 rounded`}>
                                                {member.has_paid_this_month ? 'Paid' : 'UnPaid'}
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className={`${member.has_paid_this_month ? 'bg-green-500' : 'bg-red-600'} text-white px-4 py-2 rounded opacity-50 cursor-not-allowed`}
                                            disabled
                                        >
                                            {member.has_paid_this_month ? 'Paid' : 'UnPaid'}
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className="p-2 border">
                                {user.role === 'super_admin' ?
                                    <div className="flex justify-center items-center">{member.organization.name}</div>
                                    : <div className="flex justify-center items-center">{getTimeSlotLabel(member.time_slot)}</div>
                                }
                            </td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center">{member.gender}</div>
                            </td>
                            <td className="p-2 border space-x-2">
                                <div className="flex justify-center items-center space-x-2">

                                    {(user.role !== 'member' || user.id === member.id) &&
                                        <Link href={route('members.edit', member.id)} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                    }
                                    {user.role !== 'member' &&
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="text-red-600 hover:underline"
                                        >Delete
                                        </button>
                                    }
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
