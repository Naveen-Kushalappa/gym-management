<?php
 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\OrgTimeSlot;
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
        $query = Member::with('payments')->with('timeSlot')->where('org_id', $user->org_id)->where('role', 'member');

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


    public function create(Request $request){

        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orgTimeSlots = OrgTimeSlot::where('org_id', $user->org_id)->orderBy('start_time')->get();

        return Inertia::render('Member/Create', [ 'orgTimeSlots' => $orgTimeSlots ]);
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
            'orgTimeSlotId' => 'required|string',
        ]);

        $member = Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'role' => 'member',
            'org_id' => $user->org_id,
            'org_time_slot_id' => $request->orgTimeSlotId,
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

        $orgTimeSlots = OrgTimeSlot::where('org_id', $member->org_id)->orderBy('start_time')->get();

        return Inertia::render('Member/Edit', ['member' => $member, 'orgTimeSlots' => $orgTimeSlots]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female',
            'email' => 'required|email|unique:members,email,' . $id,
            'password' => 'nullable|string|min:6|confirmed',
            'orgTimeSlotId' => 'required|string',
        ]);

        $member = Member::findOrFail($id);

        $member->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'org_time_slot_id' => $request->orgTimeSlotId,
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
