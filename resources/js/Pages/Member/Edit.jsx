import React, {useEffect, useState} from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Select from "react-select";

export default function Edit({ member, orgTimeSlots }) {
    const { data, setData, put, processing, errors } = useForm({
        name: member.name,
        email: member.email,
        password: '',
        password_confirmation: '',
        gender: member.gender,
        orgTimeSlotId: member.org_time_slot_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('members.update', member.id));
    };

    const [timeSlotOptions, setTimeSlotOptions] = useState([]);
    const [defaultTimeSlot, setDefaultTimeSlot] = useState(null);

    useEffect(() => {
        console.log('outside', orgTimeSlots);
        if(orgTimeSlots.length > 0){
            console.log('in use effect');

            setData("orgTimeSlotId", member.org_time_slot_id);
            const options = orgTimeSlots.map((timeSlot) => {
                if(timeSlot.id === member.org_time_slot_id){
                    setDefaultTimeSlot({ label: timeSlot.start_time + '-' + timeSlot.end_time, value: timeSlot.id });
                }
                return { value: timeSlot.id, label: timeSlot.start_time + '-' + timeSlot.end_time}
            });
            console.log('defaultTimeSlot', defaultTimeSlot);
            setTimeSlotOptions(options);

        }
    }, [orgTimeSlots]);


    return (
        <>
            <Head title="Edit Member" />
            <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Edit Member</h2>

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
                                defaultValue={{ label:'Current slot', value: data.orgTimeSlotId}}
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
                        <label className="block font-medium mb-1">Password (optional)</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && <div className="text-red-600">{errors.password}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
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

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update
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

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
