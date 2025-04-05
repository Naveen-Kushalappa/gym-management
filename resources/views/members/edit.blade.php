@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Edit Member123</h2>

    <form action="{{ route('members.update', $member->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name="name" class="form-control" value="{{ $member->name }}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Gender</label>
            <select name="gender" class="form-control" required>
                <option value="Male" {{ $member->gender == 'Male' ? 'selected' : '' }}>Male</option>
                <option value="Female" {{ $member->gender == 'Female' ? 'selected' : '' }}>Female</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Is Active</label>
            <select name="isActive" class="form-control" required>
                <option value="1" {{ $member->is_active == 1 ? 'selected' : '' }}>Active</option>
                <option value="0" {{ $member->is_active == 0 ? 'selected' : '' }}>In Active</option>
            </select>
        </div>
        <button type="submit" class="btn btn-success">Update</button>
        <a href="{{ route('members.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
