import React from 'react';
import { Link } from '@inertiajs/react';
import Logout from "@/Pages/Auth/Logout.jsx";

export default function Navbar() {
    return (
        <nav className="bg-white shadow mb-4">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex gap-6">
                    <Link href="/dashboard" className="text-gray-800 hover:text-blue-600 font-semibold">Dashboard</Link>
                    <Link href="/profile" className="text-gray-800 hover:text-blue-600 font-semibold">Profile</Link>
                </div>
                <div>
                    <Logout />
                </div>
            </div>
        </nav>
    );
}
