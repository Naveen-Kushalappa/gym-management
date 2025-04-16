import {Head, Link, useForm} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import Select from "react-select";

const Register = ({ orgs, orgName = null }) => {
    const orgTimeSlots = orgs[0].time_slots;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: 'Male',
        orgTimeSlotId: null,
        orgId: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('registerMember'));
    };

    const [timeSlotOptions, setTimeSlotOptions] = useState([]);
    const [orgSelectorOptions, setOrgSelectorOptions] = useState([]);

    useEffect(() => {
        if(orgs.length > 0 && !data.orgId){
            setData("orgId", orgs[0].id);
            const orgIdOptions = orgs.map((org) => {
                return { value: org.id, label: org.name }
            });
            setOrgSelectorOptions(orgIdOptions);
        }
    }, [orgs]);


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
                <h2 className="text-xl font-bold mb-4">Register {orgName ? 'for '+orgName : ''}</h2>

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
                        <label className="block font-medium mb-1">Gym name</label>
                        <Select options={orgSelectorOptions}
                                onChange={(e) => setData('orgId', e.value)}
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={orgSelectorOptions[0]}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="memberId"
                        />
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
                            Create
                        </button>
                        <Link href={route('members.index')} className="text-sm text-gray-600 hover:underline">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Register
