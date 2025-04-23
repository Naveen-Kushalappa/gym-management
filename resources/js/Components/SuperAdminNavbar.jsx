import React from 'react';
import {Link, router} from '@inertiajs/react';
import Logout from "@/Pages/Auth/Logout.jsx";

export default function SuperAdminNavbar({member}) {
    return (
        <nav className="bg-white shadow mb-4">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex gap-6">
                    <Link href={route('admin.dashboard')}
                          className="text-gray-800 hover:text-blue-600 font-semibold">Dashboard</Link>
                    <Link href={route('members.index')} className="text-gray-700 hover:text-blue-600 font-semibold">
                        Members
                    </Link>
                </div>
                <div className="flex gap-6">
                    <Logout/>
                </div>
            </div>
        </nav>
    );
}
