<?php

 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\Payment;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Log;
 use Illuminate\Support\Facades\Validator;

 class PaymentController extends Controller {

    public function store(Request $request, Member $member){

        $validator = Validator::make($request->all(), [
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|between:2022,2030',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $lastPayment = Payment::where('status', 'Paid')->where('year', $request->year)->where('month', $request->month)->first();

        if($lastPayment){
            Log::info('Payment already done');
            return back()->withErrors('Payment already exists.');
        }

        Payment::create([
            'member_id' => $member->id,
            'month' => $request->month,
            'year' => $request->year,
            'status' => 'Paid'
        ]);

        return redirect()->route('members.show', $member->id)->with('success', 'Payment recorded');
    }

 }
