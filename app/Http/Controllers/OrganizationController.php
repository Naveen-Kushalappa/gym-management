<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrganizationController extends Controller
{

    public function indexTimeSlots(Request $request, $orgId)
    {

        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }
        if ($user->role != 'super_admin') {
            return Redirect::route('login')->with('error', 'Not authorized');
        }

        $organization = Organization::with('timeSlots')->findOrFail($orgId);
        return Inertia::render('SuperAdmin/EditTimeSlots', ['organization' => $organization]);
    }

    public function updateTimeSlots(Request $request, $orgId): RedirectResponse
    {
        $user = $request->user();

        if (!$user || $user->role != 'super_admin') {
            return Redirect::route('login')->with('error', 'Not authorized');
        }

        $data = $request->validate([
            'timeSlots' => 'required|array',
            'timeSlots.*.start_time' => 'required|date_format:H:i:s',
            'timeSlots.*.end_time' => 'required|date_format:H:i:s|after:org_time_slots.*.start_time',
            'timeSlots.*.id' => 'nullable|uuid|exists:org_time_slots,id',
            'deletedIds' => 'nullable|array',
            'deletedIds.*' => 'uuid|exists:org_time_slots,id',
        ]);

        $org = Organization::with('timeSlots')->findOrFail($orgId);

        foreach ($data['timeSlots'] as $slotData) {
            if (!empty($slotData['id'])) {
                // Update existing
                $org->timeSlots()->where('id', $slotData['id'])->update([
                    'start_time' => $slotData['start_time'],
                    'end_time' => $slotData['end_time'],
                ]);
            } else {
                // Create new
                $org->timeSlots()->create([
                    'start_time' => $slotData['start_time'],
                    'end_time' => $slotData['end_time'],
                ]);
            }
        }

        // Delete slots
        if (!empty($data['deletedIds'])) {
            $org->timeSlots()->whereIn('id', $data['deletedIds'])->delete();
        }
        return redirect()->intended(route('admin.dashboard'))->with('success', 'TimeSlots updated.');
    }
}
