import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Index({ members }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this member?')) {
            destroy(route('members.destroy', id));
        }
    };

    return (
        <>
            <Head title="Manage Members" />
            <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Manage Members</h1>
                    <Link
                        href={route('members.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Member
                    </Link>
                </div>

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="p-2 border">{member.name}</td>
                            <td className="p-2 border">{member.email}</td>
                            <td className="p-2 border space-x-2">
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
                            </td>
                        </tr>
                    ))}
                    {members.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No members found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
