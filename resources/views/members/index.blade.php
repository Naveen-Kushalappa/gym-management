@extends('layouts.app')

@section('content')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-white">Gym Members</h1>

            <a href="{{ route('members.create') }}"
               class="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
                ➕ New Member
            </a>
        </div>

        <form method="GET" action="{{ route('members.index') }}" class="mb-6">
            <input
                type="text"
                name="search"
                value="{{ request('search') }}"
                placeholder="Search by name or email..."
                class="w-full sm:w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            />
        </form>

        <div class="overflow-x-auto bg-white shadow-md rounded-2xl p-4">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Is paid</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                @foreach($members as $member)
                    <tr>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ $loop->iteration }}</td>
                        <td class="px-4 py-3 text-sm text-gray-800 font-medium">{{ $member->name }}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">{{ $member->gender }}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">{{ $member->has_paid_this_month ? 'Paid' : 'Un paid' }}</td>
                        <td class="px-4 py-3 text-sm text-gray-600 space-x-2">
                            <a href="{{ route('members.show', $member) }}" class="text-green-500 hover:underline">View</a>
                            <a href="{{ route('members.edit', $member) }}" class="text-blue-500 hover:underline">Edit</a>
                            <form action="{{ route('members.destroy', $member) }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-500 hover:underline">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach

                @if ($members->isEmpty())
                    <tr>
                        <td colspan="5" class="px-4 py-6 text-center text-gray-500">No members found.</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div>
    </div>
@endsection
