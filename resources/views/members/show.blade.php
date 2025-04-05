@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Member Details</h2>

    <table class="table table-striped">
        <tr>
            <th>Name:</th>
            <td>{{ $member->name }}</td>
        </tr>
        <tr>
            <th>Gender:</th>
            <td>{{ $member->gender }}</td>
        </tr>
    </table>

    @if($member->payments->count() > 0)
        <h4>Payment History</h4>

    <table class="table table-striped ">
        <thead>
            <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($member->payments as $payment)
                <tr>
                    <td>
                         {{ date('F', mktime(0, 0, 0, $payment->month, 1)) }}
                    </td>
                    <td>{{ $payment->year }}</td>
                    <td>{{ $payment->status }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @endif
    <h4>Add Payment</h4>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    <form action="{{ route('payments.store', $member->id) }}" method="POST">
        @csrf
        <div class="mb-3">
        <label class="form-label">Month</label>
        <select name="month" class="form-control" required>
          <option value="">Select Month</option>
          @foreach(range(1, 12) as $month)
            <option value="{{ $month }}">
                {{ date('F', mktime(0, 0, 0, $month, 1)) }}
            </option>
           @endforeach
        </select>
       </div>
        <div class="mb-3">
            <label class="form-label">Year</label>
            <select name="year" class="form-control" required>
                <option value="">Select year</option>
                @foreach(range(2022, 2025) as $year)
                <option value="{{ $year }}">
                  {{ $year }}
                </option>
                @endforeach
        </select>
        </div>
        <button type="submit" class="btn btn-success">Add Payment</button>
    </form>

    <br>
    <a href="{{ route('members.index') }}" class="btn btn-secondary">Back to Members</a>
</div>
@endsection
