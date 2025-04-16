import React, {useEffect, useState} from "react";
import {Link, useForm, Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Select from 'react-select'

const Create = ({ members, userRole }) => {
    const { data, setData, post, processing, errors } = useForm({
        mode: 'UPI',
        amount: '',
        comments: '',
        memberId: null,
        startMonthYear: null,
        endMonthYear: null,
        dividePaymentByMonth: false,
    });

    const [membersOptions, setMembersOptions] = useState([]);

    useEffect(() => {
        if(members.length > 0 && !data.memberId){
            setData("memberId", members[0].id);

            const options = members.map((member) => {
                return { value: member.id, label: member.name }
            });
            setMembersOptions(options);
        }
    }, [members]);

    const [isMultiMonthPayment, setMultiMonthPayment] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('store-payment'));
    };

    return (
        <>
            <Head title="Add Payment" />
            <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Add New Payment</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Member</label>

                        <Select options={membersOptions}
                                onChange={(e) => setData('memberId', e.value)}
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={membersOptions[0]}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="memberId"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Mode</label>
                        <select name="mode"
                                className="w-full border p-2 rounded"
                                value={data.mode}
                                onChange={(e) => setData('mode', e.target.value)}
                                required>
                            <option value="UPI">UPI</option>
                            <option value="Cash">Cash</option>
                        </select>
                        {errors.mode && <div className="text-red-600">{errors.mode}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                        {errors.amount && <div className="text-red-600">{errors.amount}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Comments</label>
                        <textarea
                            value={data.comments}
                            onChange={(e) => setData('comments', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.comments && <div className="text-red-600">{errors.comments}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Payment for</label>
                        <input
                            type="month"
                            value={data.startMonthYear}
                            onChange={(e) => setData('startMonthYear', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    { userRole === 'admin' &&
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Multiple months</label>
                            <input
                                type="checkbox"
                                value={isMultiMonthPayment}
                                onChange={(e) => setMultiMonthPayment(e.target.checked)}
                                className="inline-flex border p-2 rounded"
                            />
                        </div>
                    }

                    {isMultiMonthPayment && userRole === 'admin' &&
                        <>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Divide payment for each month?</label>
                            <input
                                type="checkbox"
                                value={data.dividePaymentByMonth}
                                onChange={(e) => setData('dividePaymentByMonth', e.target.checked)}
                                className="inline-flex border p-2 rounded"
                            />
                        </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Payment till</label>
                        <input
                            type="month"
                            value={data.endMonthYear}
                            onChange={(e) => setData('endMonthYear', e.target.value)}
                            className="w-full border p-2 rounded"
                            required={isMultiMonthPayment}
                        />
                    </div>
                        </>
                    }

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add payment
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

Create.layout = (page) => <AuthenticatedLayout children={page} />;

export default Create
