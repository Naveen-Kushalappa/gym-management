<?php
namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }
        if($user->role == 'super_admin'){
            return Redirect::route('admin.dashboard')->with('success', 'Redirecting to super admin dashboard');
        }

        $member = Member::with('organization')->where('id', $request->user()->id)->first();

        $activeMembers = [];
        $unPaidMemberCount = 0;
        if($member->role == 'admin') {
            $activeMembers = Member::where('org_id', $user->org_id)
                ->where('role', 'member')
                ->where('is_active', true)
                ->get();

            foreach ($activeMembers as $activeMember) {
                if (!$activeMember->has_paid_this_month) {
                    $unPaidMemberCount++;
                }
            }
        }
        return Inertia::render('Dashboard', [
            'member' => $member,
            'activeMemberCount' => sizeof($activeMembers),
            'unPaidMemberCount' => $unPaidMemberCount
        ]);
    }

}
