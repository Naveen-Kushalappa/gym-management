<?php
 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\Organization;
 use App\Models\OrgTimeSlot;
 use Carbon\Carbon;
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

        $isAdminUser = $user->role == 'admin';

        $query = Member::with('payments')->with('timeSlot')
            ->where('org_id', $user->org_id)->where('role', 'member');

        if(!$isAdminUser) {
            $query->where('org_time_slot_id', $user->org_time_slot_id)
                ->orderByRaw("id = ? DESC", [$user->id]);
        }
        if($request->has('timeSlotId') && $request->timeSlotId != null) {
            $query->where('org_time_slot_id', $request->timeSlotId);
        }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
        $month = (int)Carbon::now()->month;
        $year = Carbon::now()->year;

        if($request->has('unPaidMembers')){
            if($request->unPaidMembers == "true") {
                $query->whereDoesntHave('payments', function ($q) use ($month, $year) {
                    $q->where('month', $month)
                        ->where('year', $year);
                });
            } elseif($request->unPaidMembers == "false") {
                $query->whereHas('payments', function ($q) use ($month, $year) {
                    $q->where('month', $month)
                        ->where('year', $year);
                });
            }
        }
        $members = $query->paginate(15)->withQueryString();

        $orgTimeSlots = OrgTimeSlot::where('org_id',$user->org_id )->get();

        return Inertia::render('Member/Index', [
            'members' => $members,
            'filters' => $request->only('search'),
            'orgTimeSlots' => $orgTimeSlots
        ]);
    }


    public function create(Request $request){

        $user = $request->user();

        if ($user->role == 'member') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $orgId = $user->org_id;
        $organizations = null;
        if($user->role == 'super_admin')
        {
            if($request->has('orgId')) {
                $orgId = $request->orgId;
            }
            $organizations = Organization::get();
        }
        $orgTimeSlots = OrgTimeSlot::where('org_id', $orgId)->orderBy('start_time')->get();

        return Inertia::render('Member/Create', [ 'orgTimeSlots' => $orgTimeSlots, 'orgId' => $orgId,
            'organizations' => $organizations ]);
    }

    /***
     * Store member created from admin page
     */
    public function store(Request  $request){
        $user = $request->user();

        if ($user->role == 'member') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'gender' => 'required|in:Male,Female',
            'password' => 'required|string|min:6',
            'orgTimeSlotId' => 'required|string',
        ]);
        $orgId =  $user->org_id ?: $request->orgId;

        $member = Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'org_id' => $orgId,
            'org_time_slot_id' => $request->orgTimeSlotId,
        ]);

        Log::info($member);

        return Redirect::route('members.index')->with('success', 'Member created successfully.');
    }

     /***
      * Store member created from member registration
      */
     public function registerMember(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'gender' => 'required|in:Male,Female',
            'password' => 'required|string|min:6|confirmed',
            'orgTimeSlotId' => 'required|string',
            'orgId' => 'required|uuid|exists:organizations,id',
        ]);

        $member = Member::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'role' => 'member',
            'org_id' => $request->orgId,
            'org_time_slot_id' => $request->orgTimeSlotId,
        ]);

        return Redirect::route('login')->with('success', 'Member created successfully.');
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
            'is_active' => 'required|in:0,1',
        ]);

        $member = Member::findOrFail($id);

        $member->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'org_time_slot_id' => $request->orgTimeSlotId,
            'is_active' => (int)$request->is_active,
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

     public function register($orgId = null){
         $orgName = null;
         if($orgId) {
             $org = Organization::with(['timeSlots' => function ($query) {
                 $query->orderBy('start_time');
             }])->findOrFail($orgId);
             $orgName = $org->name;
             $allOrgs = [$org];
         }else{
             $allOrgs = Organization::with(['timeSlots' => function ($query) {
                 $query->orderBy('start_time');
             }])->get();

         }

         return Inertia::render('Member/Register', [ 'orgs' => $allOrgs, 'orgName' => $orgName ]);

     }
 }
