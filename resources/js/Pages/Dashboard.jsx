import React from 'react';
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Dashboard({ member, activeMemberCount }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                    <div className="flex justify-between items-center mb-4">

                    <h1 className="flex items-center text-2xl font-bold mb-4">
                        Welcome, {member.name}!
                    </h1>
                        <p className="text-lg mb-2">You are logged in as <strong>Admin</strong>.</p>
                    </div>

                    {member.role === 'admin' ? (
                        <AdminDashboard member={member} activeMemberCount={activeMemberCount} />
                    ) : (
                        <MemberDashboard />
                    )}
                </div>
            </div>
        </>
    );
}

const AdminDashboard = ({ member, activeMemberCount }) => {
    return (
        <div>
            <p className="text-lg mb-2">Total {activeMemberCount} members are active in <strong>{member.organization.name}</strong>.</p>
            <ul className="list-disc list-inside">
                <li>
                    <Link
                    href={route('members.index')}
                    className="text-blue-600 hover:underline"
                >
                    Members
                </Link>
               </li>
                <li> <Link
                    href={route('payments')}
                    className="text-blue-600 hover:underline"
                >
                    Payments
                </Link></li>
            </ul>
        </div>
    );
}

const MemberDashboard = () => {
    return (
        <div>
            <p className="text-lg mb-2">You are logged in as <strong>Member</strong>.</p>
            <ul className="list-disc list-inside">
                <li>View Profile</li>
                <li>Check Payment Status</li>
                <li>Update Details</li>
            </ul>
        </div>
    );
}

Dashboard.layout = (page) => <AuthenticatedLayout children={page} />;
