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
        $query = Member::with('payments')->where('org_id', $user->org_id)->where('role', 'member');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
        $members = $query->paginate(15)->withQueryString();

        return Inertia::render('Member/Index', [
            'members' => $members,
            'filters' => $request->only('search')
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
    public function edit($id){
        $member = Member::findOrFail($id);
        return Inertia::render('Member/Edit', ['member' => $member]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female',
            'email' => 'required|email|unique:members,email,' . $id,
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $member = Member::findOrFail($id);

        $member->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('members.index')->with('success', 'Member updated successfully.');
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
         return Redirect::back()->with(['message' => 'Member deleted']);
     }
 }
