<?php

 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\Payment;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\DB;
 use Illuminate\Support\Facades\Log;
 use Illuminate\Support\Facades\Validator;
 use Inertia\Inertia;
 use Carbon\Carbon;

 class PaymentController extends Controller {

     public function create(Request $request) {
         $user = $request->user();

         $members = Member::where('org_id', $user->org_id)->where('role', 'member')->get();

         return Inertia::render('Payment/Create', [
             'members' => $members,
         ]);
     }

    public function store(Request $request){
         $user = $request->user();

        $validator = Validator::make($request->all(), [
            'memberId' => 'required|uuid|exists:members,id',
            'amount' => 'required|numeric',
            'mode' => 'required|in:UPI,Cash',
            'startMonthYear' => 'required|date',
        ]);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        //todo: check if endMonth is present. If yes add multiple payments.
        $paymentStartDate = Carbon::parse($request->startMonthYear);

        $month = $paymentStartDate->month;
        $year = $paymentStartDate->year;

        $lastPayment = Payment::where('year', $year)->where('month', $month)->where('member_id', $request->memberId)->first();

        if($lastPayment){
            Log::info('Payment already done');
            return back()->withErrors('Payment already exists.');
        }

        $payment = Payment::create([
            'member_id' => $request->memberId,
            'month' => $month,
            'year' => $year,
            'org_id' => $user->org_id,
            'comments' => $request->comments,
            'mode' => $request->mode,
            'amount' => $request->amount,
        ]);
        return redirect()->route('members.index')->with('success', 'Payment recorded');
    }

    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }

        $query = Payment::with('member');

        //todo: Add search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('comments', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
//        dd($query->get());

        $payments = $query->paginate(15)->withQueryString();
//        dd($payments);

        return Inertia::render('Payment/Index', [
            'payments' => $payments,
            'filters' => $request->only('search')
        ]);
    }

 }
