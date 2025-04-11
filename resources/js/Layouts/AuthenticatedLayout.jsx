import React from 'react';
import Navbar from '../Components/Navbar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div>
            <Navbar member={auth.user}/>
            <main>{children}</main>
        </div>
    );
}
