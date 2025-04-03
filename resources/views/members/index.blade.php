@extends('layouts.app');

@section('content')
<div class="container">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="mb-0">Gym Members</h2>
        <a href="{{ route('members.create') }}" class="btn btn-primary">Add member</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if(count($members) > 1)
        <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th> 
                    Name
                </th>
            
                <th> 
                    Gender
                </th>
                <th> 
                    Payments
                </th>
                 <th> 
                    Is active
                </th>
                <th> 
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach ($members as $member)
                <tr>
                <td>{{ $member->name }}</td>    
                <td>{{ $member->gender }}</td>    
                @if($member->payments->count() > 0)
                    <td>{{ $member->payments->first()->status}}</td>
                @else
                    <td>UnPaid</td>
                @endif
                <td>{{ $member->is_active ? "Active" : "In active" }}</td>    

                <td>
                    <a href="{{ route('members.show', $member->id) }}" class="btn btn-info btn-sm">View</a>
                    <a href="{{ route('members.edit', $member->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('members.destroy', $member->id) }}" method="POST" class="d-inline">

                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?')">Delete</button>

                    </form>
                </td>    
                </tr>
            @endforeach
        </tbody>
        </table>
    @else
        <h3>No members added</h3>
    @endif
</div>
@endsection