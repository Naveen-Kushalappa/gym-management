import React, { useState } from 'react';
import {Link, useForm} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const EditTimeSlots = ({ organization }) => {
    const { time_slots } = organization;

    const { data, setData, post, processing, errors } = useForm({
        deletedIds: [],
        timeSlots: time_slots,
        }
    );

    const handleChange = (index, field, value) => {
        const updated = [...data.timeSlots];
        if (value && value.length === 5) {
            value = value + ':00';
        }
        updated[index][field] = value;
        // setSlots(updated);
        setData("timeSlots", updated);
    };

    const addSlot = () => {
        setData("timeSlots",[
            ...data.timeSlots,
            {
                id: null,
                start_time: '',
                end_time: '',
            },
        ]);
    };

    const removeSlot = (index) => {
        const removed = data.timeSlots[index];
        if (removed.id) {
            setData("deletedIds", [...data.deletedIds, removed.id]);
        }
        const updated = [...data.timeSlots];
        updated.splice(index, 1);
        // setSlots(updated);
        setData("timeSlots", updated);

        // setData("deleted_ids_payload", deletedIds);
    };

    const validateSlots = () => {
        for (let slot of data.timeSlots) {
            if (!slot.start_time || !slot.end_time) return false;
            if (slot.start_time >= slot.end_time) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateSlots()) {
            alert('Each start time must be earlier than end time.');
            return;
        }
        console.log('Submit: ')

        console.log('data');
        console.log(data);
        // console.log(time_slots_payload);
        // console.log(deleted_ids_payload);
        // const response = await axios.put(`/admin/organizations/${organization.id}/timeslots`, {
        //     time_slots: timeSlots,
        //     deleted_ids: deletedIds,
        // });
        console.log("Form data before submit:", data);

        post(route('admin.timeslots.update', organization.id))
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="flex-col text-2xl font-bold mb-6">Edit Time Slots for {organization.name}</h1>

            <Link href={route('admin.dashboard')} className="text-sm text-gray-600 hover:underline flex gap-2 justify-center sm:justify-end mb-6">
                Dashboard
            </Link>

            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {data.timeSlots.map((slot, index) => (
                    <div key={slot.id} className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Start Time</label>
                            <input
                                type="time"
                                value={slot.start_time}
                                onChange={(e) => handleChange(index, 'start_time', e.target.value)}
                                className="border rounded px-3 py-1"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">End Time</label>
                            <input
                                type="time"
                                value={slot.end_time}
                                onChange={(e) => handleChange(index, 'end_time', e.target.value)}
                                className="border rounded px-3 py-1"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => removeSlot(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {errors.time_slots && (
                    <p className="text-red-500 text-sm">{errors.time_slots}</p>
                )}

                <button
                    type="button"
                    onClick={addSlot}
                    className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400"
                >
                    + Add Time Slot
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {processing ? 'Saving...' : 'Save Time Slots'}
                </button>
            </form>

        </div>
    );
}

export default EditTimeSlots;

EditTimeSlots.layout = (page) => <AuthenticatedLayout children={page} />;
