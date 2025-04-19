import {Head, Link} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";
import React from "react";

const Index = ({ organizations }) => {

    return (
        <>
            <Head title="Manage admins"/>
            <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-center sm:text-left mb-4">Organizations</h1>

                    {/* Action Links */}
                    <div className="flex gap-2 justify-center sm:justify-end">

                    </div>
                </div>
                {/*<div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between mb-6">*/}

                {/*    /!* Search Form *!/*/}
                {/*    <form*/}
                {/*        onSubmit={handleSearch}*/}
                {/*        className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"*/}
                {/*    >*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            name="search"*/}
                {/*            value={data.search}*/}
                {/*            onChange={(e) => setData('search', e.target.value)}*/}
                {/*            placeholder="Search by name/email"*/}
                {/*            className="border px-3 py-2 rounded w-full sm:w-64"*/}
                {/*        />*/}
                {/*        <button*/}
                {/*            type="submit"*/}
                {/*            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"*/}
                {/*        >*/}
                {/*            Search*/}
                {/*        </button>*/}
                {/*    </form>*/}

                {/*    <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full md:w-auto">*/}
                {/*        <select*/}
                {/*            className="border p-2 pr-2 rounded w-full sm:w-48"*/}
                {/*            value={timeSlotFilter}*/}
                {/*            onChange={(e) => setTimeSlotFilter(e.target.value)}*/}
                {/*        >*/}
                {/*            <option value="">All timeslots</option>*/}
                {/*            {orgTimeSlots.map((timeSlot, i) => (*/}
                {/*                <option key={i} value={timeSlot.id}>*/}
                {/*                    {`${timeSlot.end_time} - ${timeSlot.start_time}`}*/}
                {/*                </option>*/}
                {/*            ))}*/}
                {/*        </select>*/}
                {/*    </div>*/}

                {/*    /!* Filter Buttons *!/*/}
                {/*    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            onClick={() => setPaidFilterState('all')}*/}
                {/*            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"*/}
                {/*        >*/}
                {/*            All*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            onClick={() => setPaidFilterState(true)}*/}
                {/*            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"*/}
                {/*        >*/}
                {/*            Unpaid*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            onClick={() => setPaidFilterState(false)}*/}
                {/*            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"*/}
                {/*        >*/}
                {/*            Paid*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="overflow-x-auto w-full">
                    <table className="w-full table-auto border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border text-center">Name</th>
                            <th className="p-2 border text-center">Members count</th>
                            <th className="p-2 border text-center">Time slot</th>
                            <th className="p-2 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {organizations.map((org) => (
                            <tr key={org.id}>
                                <td className="p-2 border">
                                    <div className="flex justify-center items-center">{org.name}</div>
                                </td>
                                <td className="p-2 border">
                                    <div className="flex justify-center items-center">{org.member_count}</div>
                                </td>
                                <td className="p-2 border">
                                    <Link href={route('payments')}>
                                        Edit
                                    </Link>
                                </td>

                                <td className="p-2 border space-x-2">
                                    <div className="flex justify-center items-center space-x-2">

                                        <Link
                                            href={route('members.create', { orgId: org.id })}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
                                            Add admin
                                        </Link>
                                    </div>
                                    {/*    {(user.role === 'admin' || user.id === member.id) &&*/}
                                    {/*        <Link href={route('members.edit', member.id)} className="text-blue-600 hover:underline">*/}
                                    {/*            Edit*/}
                                    {/*        </Link>*/}
                                    {/*    }*/}
                                    {/*    {user.role === 'admin' &&*/}
                                    {/*        <button*/}
                                    {/*            onClick={() => handleDelete(member.id)}*/}
                                    {/*            className="text-red-600 hover:underline"*/}
                                    {/*        >Delete*/}
                                    {/*        </button>*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export  default Index
