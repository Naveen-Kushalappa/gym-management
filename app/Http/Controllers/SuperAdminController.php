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

class SuperAdminController extends Controller {

    public function index() {

        $organizations = Organization::with(['members' => function ($query){
            $query->where('role', 'admin');
        }])->withCount([
                'members as member_count' => function ($query) {
                    $query->where('role', 'member');
                }
            ])
            ->with('timeSlots')->get();

        return Inertia::render('SuperAdmin/Index', ['organizations' => $organizations]);
    }
}
