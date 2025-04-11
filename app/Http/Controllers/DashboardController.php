<?php
namespace App\Http\Controllers;


use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }

        $member = Member::with('organization')->where('id', $request->user()->id)->first();

        $activeMemberCount = Member::where('org_id', $user->org_id)
            ->where('role', 'member')
            ->where('is_active', true)
            ->count();

        return Inertia::render('Dashboard', [
            'member' => $member,
            'activeMemberCount' => $activeMemberCount
        ]);
    }

}
