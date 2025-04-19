import React, {useEffect, useState} from 'react';
import {useForm, Head, Link, usePage} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Select from "react-select";

const Create = ({ orgTimeSlots, orgId, organizations = null }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        gender: 'Male',
        orgTimeSlotId: null,
        orgId: orgId,
        role: 'member',
    });

    const user = usePage().props.auth.user;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('members.store'));
    };

    const [timeSlotOptions, setTimeSlotOptions] = useState([]);

    useEffect(() => {
        if(orgTimeSlots.length > 0 && !data.orgTimeSlot){
            setData("orgTimeSlotId", orgTimeSlots[0].id);

            const options = orgTimeSlots.map((timeSlot) => {
                return { value: timeSlot.id, label: timeSlot.start_time + '-' + timeSlot.end_time}
            })
            setTimeSlotOptions(options);
        }
    }, [orgTimeSlots]);

    return (
        <>
            <Head title="Add Member" />
            <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Add New Member</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>


                    <div className="mb-4">
                        <label className="block font-medium mb-1">Time-slot</label>
                        <Select options={timeSlotOptions}
                                onChange={(e) => setData('orgTimeSlotId', e.value)}
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={timeSlotOptions[0]}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="memberId"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.email && <div className="text-red-600">{errors.email}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && <div className="text-red-600">{errors.password}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Gender</label>
                        <select name="gender"
                                className="w-full border p-2 rounded"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {user.role === 'super_admin' &&
                        <div className="mb-4">
                        <label className="block font-medium mb-1">Role</label>
                        <select name="role"
                                className="w-full border p-2 rounded"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                required>
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                        </select>
                    </div>
                    }
                    {user.role === 'super_admin' &&
                        <div className="mb-4">
                        <label className="block font-medium mb-1">Org</label>
                        <select name="role"
                                className="w-full border p-2 rounded"
                                value={data.orgId}
                                onChange={(e) => setData('orgId', e.target.value)}
                                required>
                            <option value="">Select org</option>
                                        {organizations.map((org, i) => (
                                            <option key={i} value={org.id}>
                                                {org.name}
                                            </option>
                                        ))}
                        </select>
                    </div>
                    }

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create
                        </button>
                        <Link href={route('members.index')} className="text-sm text-gray-600 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => <AuthenticatedLayout children={page} />;

export default Create;
