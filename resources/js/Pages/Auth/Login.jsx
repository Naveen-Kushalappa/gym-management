import React, { useState } from 'react';
import {Head, router, useForm, usePage} from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const { props } = usePage();
    if (props.auth?.user) {
        router.visit('/');
    }

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        {errors.message && <div className="text-red-500 text-sm">{errors.message}</div>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
