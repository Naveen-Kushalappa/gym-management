import React from 'react';
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CopyLink from "@/Components/CopyLink.jsx";

export default function Dashboard({ member, activeMemberCount, unPaidMemberCount }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                    <div className="flex justify-between items-center mb-4">

                    <h1 className="flex items-center text-2xl font-bold mb-4">
                        Welcome, {member.name} to {member.organization.name}!
                    </h1>
                        <p className="text-lg mb-2">You are logged in as <strong>{member.role}</strong>.</p>
                    </div>

                    {member.role === 'admin' ? (
                        <AdminDashboard member={member} activeMemberCount={activeMemberCount} unPaidMemberCount={unPaidMemberCount}/>
                    ) : (
                        <MemberDashboard member={member}/>
                    )}
                </div>
            </div>
        </>
    );
}

const AdminDashboard = ({ member, activeMemberCount, unPaidMemberCount }) => {
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    return (
        <div>
            <p className="text-lg mb-2">Register new members link :
                <CopyLink url={route('register', {orgId: member.org_id})} />
            </p>
            <p className="text-lg mb-2">Total {activeMemberCount} members are active in <strong>{member.organization.name}</strong>.</p>
            <p className="text-lg mb-2">
                <Link
                    href={route('members.index', { unPaidMembers: 'true'})}
                    className="text-blue-600 hover:underline"
                >
                    {unPaidMemberCount} members
                </Link> have payment pending for current month ({currentMonth}).
            </p>
            {/* todo : Add registration link for org*/}
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

const MemberDashboard = ({ member }) => {
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

    return (
        <div>
            {!member.has_paid_this_month && <strong className="text-red-600 animate-pulse">
                Payment for {currentMonth} is due.</strong> }
            <ul className="list-disc list-inside">
                <li>
                    <Link href={route('payments')} className="text-blue-600 hover:underline">
                        Payments history
                    </Link>
                </li>
                <li>
                    <Link
                        href={route('members.index')}
                        className="text-blue-600 hover:underline"
                    >
                        Members for this slot
                    </Link>
                </li>
                <li>Update Details</li>
            </ul>
        </div>
    );
}

Dashboard.layout = (page) => <AuthenticatedLayout children={page} />;
