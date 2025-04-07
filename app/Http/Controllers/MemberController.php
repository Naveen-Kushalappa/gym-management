<?php
 namespace App\Http\Controllers;
 use App\Models\Member;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Log;

 class MemberController extends Controller {
     public function index(Request $request)
     {
         $search = $request->input('search');
         $members = Member::query()
             ->when($search, function ($query, $search) {
                 $query->where('name', 'like', "%{$search}%");
             })
             ->orderBy('created_at', 'desc')
             ->get();

        return view('members.index', compact('members'));
    }


    public function create(){
        return view('members.create');
    }

    public function store(Request  $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female',
        ]);
        $member = Member::create($request->all());

        return redirect()->route('members.index')->with('success', 'Member added successfully!!!');
    }

    public function show(Member $member){
        return view('members.show', compact('member'));
    }
    public function edit(Member $member){
        return view('members.edit', compact('member'));
    }

    public function update(Request $request, Member $member){
        $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female',
            'isActive' => 'required|boolean',
        ]);

        $member->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'is_active' => $request->isActive,
        ]);

        return redirect()->route('members.index')->with('success', 'Member updated successfully!!!');
    }

    public function destroy(Member $member){
        $member->delete();

        return redirect()->route('members.index')->with('success', 'Deleted member');
    }

 }
