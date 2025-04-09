<?php
 namespace App\Http\Controllers;
 use App\Models\Member;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Hash;
 use Illuminate\Support\Facades\Log;
 use Illuminate\Support\Facades\Redirect;
 use Inertia\Inertia;

 class MemberController extends Controller {

    public function index(Request $request){
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }
        $members = Member::where('org_id', $user->org_id)->where('role', 'member')->get();

        return Inertia::render('Member/Index', [
            'members' => $members
        ]);
    }


    public function create(){
        return Inertia::render('Member/Create');
    }

    public function store(Request  $request){
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'gender' => 'required|in:Male,Female',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $member = Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'role' => 'member',
            'org_id' => $user->org_id,
        ]);

        Log::info($member);

//        return Inertia::render('Member/Index');
        return Redirect::route('members.index')->with('success', 'Member created successfully.');
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

     public function destroy(Request $request, $id)
     {
         $user = $request->user();

         if ($user->role !== 'admin') {
             return response()->json(['message' => 'Unauthorized'], 403);
         }

         $member = Member::where('org_id', $user->org_id)
             ->where('role', 'member')
             ->findOrFail($id);

         $member->delete();

         return response()->json(['message' => 'Member deleted']);
     }
 }
