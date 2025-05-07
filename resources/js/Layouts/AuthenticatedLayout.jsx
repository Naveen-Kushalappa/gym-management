import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import {Head, usePage} from '@inertiajs/react';
import SuperAdminNavbar from "@/Components/SuperAdminNavbar.jsx";

const MessageComponent = ({ success, error }) => {
    return <>
        {
            success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
            {success}
        </div>
        }
        {   error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
            {error}
        </div>
    }
    </>
}

export default function AuthenticatedLayout({ children }) {
    const { auth, flash } = usePage().props;

    const [success, setSuccess] = useState(flash.success);
    const [error, setError] = useState(flash.error);

    useEffect(() => {
        if (flash.success) {
            setSuccess(flash.success);
            const timeout = setTimeout(() => setSuccess(null), 4000); // 4 seconds
            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    useEffect(() => {
        if (flash.error) {
            setError(flash.error);
            const timeout = setTimeout(() => setError(null), 4000); // 4 seconds
            return () => clearTimeout(timeout);
        }
    }, [flash.error]);


    return <>
        <div>
            <Head title="NaveenApps">
                <link rel="icon" type="image/png" href="/gym-mgmt-logo.png" />
            </Head>
            {auth.user.role === 'super_admin' ?
                <SuperAdminNavbar member={auth.user}/> :
                <Navbar member={auth.user}/>
            }
            <main><>
                {(success || error) && <MessageComponent success={success} error={error} />}
                {children}</></main>

        </div>
    </>;
}
