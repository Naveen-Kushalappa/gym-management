import React from 'react';
import { Head } from '@inertiajs/react';
import Logout from '../Pages/Auth/Logout.jsx';

export default function Dashboard({ user }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Welcome, {user.name}!


                    </h1>
                    <Logout />

                    {user.role === 'admin' ? (
                        <AdminDashboard />
                    ) : (
                        <MemberDashboard />
                    )}
                </div>
            </div>
        </>
    );
}

function AdminDashboard() {
    return (
        <div>
            <p className="text-lg mb-2">You are logged in as <strong>Admin</strong>.</p>
            <ul className="list-disc list-inside">
                <li>Manage Members</li>
                <li>View Payments</li>
                <li>System Overview</li>
            </ul>
        </div>
    );
}

function MemberDashboard() {
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
