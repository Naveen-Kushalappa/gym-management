import {Head, Link} from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

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
                                    <Link href={route('members.index', { search: org.name })} className="text-blue-600 hover:underline flex justify-center items-center">
                                        {org.name}
                                    </Link>
                                </td>
                                <td className="p-2 border">
                                    <div className="flex justify-center items-center">{org.member_count}</div>
                                </td>
                                <td className="p-2 border">
                                    <Link href={route('admin.editTimeslots', { orgId: org.id })} className="text-blue-600 hover:underline flex justify-center items-center">
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

Index.layout = (page) => <AuthenticatedLayout children={page} />;
