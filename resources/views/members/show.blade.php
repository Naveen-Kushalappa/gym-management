@extends('layouts.app')

@section('content')
{{--<div class="container">--}}
{{--    <h2>Member Details</h2>--}}

{{--    <table class="table table-striped">--}}
{{--        <tr>--}}
{{--            <th>Name:</th>--}}
{{--            <td>{{ $member->name }}</td>--}}
{{--        </tr>--}}
{{--        <tr>--}}
{{--            <th>Gender:</th>--}}
{{--            <td>{{ $member->gender }}</td>--}}
{{--        </tr>--}}
{{--    </table>--}}

{{--    @if($member->payments->count() > 0)--}}
{{--        <h4>Payment History</h4>--}}

{{--    <table class="table table-striped ">--}}
{{--        <thead>--}}
{{--            <tr>--}}
{{--                <th>Month</th>--}}
{{--                <th>Year</th>--}}
{{--                <th>Status</th>--}}
{{--            </tr>--}}
{{--        </thead>--}}
{{--        <tbody>--}}
{{--            @foreach ($member->payments as $payment)--}}
{{--                <tr>--}}
{{--                    <td>--}}
{{--                         {{ date('F', mktime(0, 0, 0, $payment->month, 1)) }}--}}
{{--                    </td>--}}
{{--                    <td>{{ $payment->year }}</td>--}}
{{--                    <td>{{ $payment->status }}</td>--}}
{{--                </tr>--}}
{{--            @endforeach--}}
{{--        </tbody>--}}
{{--    </table>--}}

{{--    @endif--}}
{{--    <h4>Add Payment</h4>--}}
{{--    @if ($errors->any())--}}
{{--        <div class="alert alert-danger">--}}
{{--            <ul>--}}
{{--                @foreach ($errors->all() as $error)--}}
{{--                    <li>{{ $error }}</li>--}}
{{--                @endforeach--}}
{{--            </ul>--}}
{{--        </div>--}}
{{--    @endif--}}
{{--    @if(session('success'))--}}
{{--        <div class="alert alert-success">--}}
{{--            {{ session('success') }}--}}
{{--        </div>--}}
{{--    @endif--}}
{{--    <form action="{{ route('payments.store', $member->id) }}" method="POST">--}}
{{--        @csrf--}}
{{--        <div class="mb-3">--}}
{{--        <label class="form-label">Month</label>--}}
{{--        <select name="month" class="form-control" required>--}}
{{--          <option value="">Select Month</option>--}}
{{--          @foreach(range(1, 12) as $month)--}}
{{--            <option value="{{ $month }}">--}}
{{--                {{ date('F', mktime(0, 0, 0, $month, 1)) }}--}}
{{--            </option>--}}
{{--           @endforeach--}}
{{--        </select>--}}
{{--       </div>--}}
{{--        <div class="mb-3">--}}
{{--            <label class="form-label">Year</label>--}}
{{--            <select name="year" class="form-control" required>--}}
{{--                <option value="">Select year</option>--}}
{{--                @foreach(range(2022, 2025) as $year)--}}
{{--                <option value="{{ $year }}">--}}
{{--                  {{ $year }}--}}
{{--                </option>--}}
{{--                @endforeach--}}
{{--        </select>--}}
{{--        </div>--}}
{{--        <button type="submit" class="btn btn-success">Add Payment</button>--}}
{{--    </form>--}}

{{--    <br>--}}
{{--    <a href="{{ route('members.index') }}" class="btn btn-secondary">Back to Members</a>--}}
{{--</div>--}}

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow-md rounded-2xl p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Member Details</h1>

        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-600">Name</label>
                <p class="text-lg text-gray-800">{{ $member->name }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-600">gender</label>
                <p class="text-lg text-gray-800">{{ $member->gender }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-600">Joined On</label>
                <p class="text-lg text-gray-800">{{ $member->created_at->format('F j, Y') }}</p>
            </div>
        </div>

        <div class="mt-6 flex justify-between">
            <a href="{{ route('members.edit', $member) }}"
               class="bg-blue-600 text-black px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                ✏️ Edit
            </a>

            <a href="{{ route('members.index') }}"
               class="text-gray-600 hover:text-blue-600 transition">
                ← Back to Members
            </a>
        </div>
    </div>

<div class="mt-10 bg-white shadow-md rounded-2xl p-6">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">💰 Payment History</h2>

        <a href="{{ route('payments.store', ['member' => $member->id]) }}"
           class="bg-green-600 text-black px-4 py-2 rounded-xl text-sm hover:bg-green-700 transition">
            ➕ Add Payment
        </a>
    </div>
    @if($member->payments->isEmpty())
        <p class="text-gray-500">No payments found for this member.</p>
    @else
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Amount</th>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Notes</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                @foreach($member->payments as $payment)
                    <tr>
                        <td class="px-4 py-2 text-gray-700">{{ $payment->created_at->format('M d, Y') }}</td>
                        <td class="px-4 py-2 text-gray-800 font-medium">₹{{ number_format($payment->amount, 2) }}</td>
                        <td class="px-4 py-2 text-gray-600">{{ $payment->notes ?? '—' }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    @endif
</div>
</div>

@endsection
