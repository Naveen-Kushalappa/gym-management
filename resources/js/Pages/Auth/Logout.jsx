import React from "react";
import { useForm } from '@inertiajs/react';

export default function Logout() {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
        >
            Logout
        </button>
    );
}
