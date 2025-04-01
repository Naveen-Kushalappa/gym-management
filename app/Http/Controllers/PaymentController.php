<?php
 
 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\Payment;
 use Illuminate\Http\Request;

 class PaymentController extends Controller {

    public function store(Request $request, Member $member){

        $request->validate([
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|between:2022,2030',
            'status' => 'required|in:Paid,Unpaid'
        ]);

        Payment::create([
            'member_id' => $member->id,
            'month' => $request->month,
            'year' => $request->year,
            'status' => $request->status
        ]);

        return redirect()->route('members.show', $member->id)->with('Success', 'Payment recorded');
    }

 }