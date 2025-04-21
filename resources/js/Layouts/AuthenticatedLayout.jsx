import React from 'react';
import Navbar from '../Components/Navbar';
import {Head, usePage} from '@inertiajs/react';
import SuperAdminNavbar from "@/Components/SuperAdminNavbar.jsx";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="NaveenApps">
                <link rel="icon" type="image/png" href="/gym-mgmt-logo.png" />
            </Head>
            <div>
                {auth.user.role === 'super_admin' ?
                    <SuperAdminNavbar member={auth.user}/> :
                    <Navbar member={auth.user}/>
                }
                <main>{children}</main>
            </div>
        </>
    );
}
