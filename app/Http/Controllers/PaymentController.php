<?php

 namespace App\Http\Controllers;
 use App\Models\Member;
 use App\Models\Payment;
 use Illuminate\Http\Request;
 use Illuminate\Support\Collection;
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


     public function getMonthsBetween(Carbon $startDate, Carbon $endDate): Collection
     {
         $months = collect();

         $date = $startDate->copy()->startOfMonth();

         while ($date->lessThanOrEqualTo($endDate)) {
             $months->push([
//                 'month' => $date->format('F'), // e.g., January
                 'month_number' => (int)$date->format('m'), // e.g., 01
                 'year' => $date->format('Y'),
//                 'label' => $date->format('F Y') // e.g., January 2024
             ]);
             $date->addMonth();
         }
         return $months;
     }

     public static function hasPaymentAlreadyMadeForUserMonth($month, $year, $memberId): bool
     {
         $lastPayment = Payment::where('year', $year)->where('month', $month)->where('member_id', $memberId)->first();
         return !is_null($lastPayment);
     }

    public function store(Request $request)
    {
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

        $paymentStartDate = Carbon::parse($request->startMonthYear);
        $memberId = $request->memberId;

        if ($request->endMonthYear) {
            Log::info('Adding payment for multiple months');
            $paymentEndDate = Carbon::parse($request->endMonthYear);
            $months = $this->getMonthsBetween($paymentStartDate, $paymentEndDate);

            try {
                DB::beginTransaction();

                $amount = $request->dividePaymentByMonth ? $request->amount / sizeof($months) : $request->amount;

                foreach ($months as $item) {
                    Log::info('item data', ['month no' => $item['month_number'], 'year' => $item['year'], 'memberId' => $memberId]);
                    $isPaymentAlreadyDone = self::hasPaymentAlreadyMadeForUserMonth($item['month_number'], $item['year'], $memberId);

                    Log::info('is Payment already done?', ['result' => $isPaymentAlreadyDone]);

                    if ($isPaymentAlreadyDone) {
                        Log::info('Payment already done');
                        DB::rollBack();
                        return back()->withErrors('Payment already exists.');
                    }else {
                        Payment::create([
                            'member_id' => $memberId,
                            'month' => $item['month_number'],
                            'year' => $item['year'],
                            'org_id' => $user->org_id,
                            'comments' => $request->comments,
                            'mode' => $request->mode,
                            'amount' => $amount,
                        ]);
                    }
                }
                DB::commit();
            } catch (\Throwable $e) {
                DB::rollBack();
                return back()->withErrors('Unable to add payment.');
            }
        } else {
            $month = $paymentStartDate->month;
            $year = $paymentStartDate->year;

            $isPaymentAlreadyDone = self::hasPaymentAlreadyMadeForUserMonth($month, $year, $memberId);

            if ($isPaymentAlreadyDone) {
                Log::info('Payment already done');
                return back()->withErrors('Payment already exists.');
            }

            Payment::create([
                'member_id' => $memberId,
                'month' => $month,
                'year' => $year,
                'org_id' => $user->org_id,
                'comments' => $request->comments,
                'mode' => $request->mode,
                'amount' => $request->amount,
                ]);
        }
        return redirect()->route('members.index')->with('success', 'Payment recorded');
    }

    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Logged out'], 403);
        }

        $query = Payment::with('member')->where('org_id', $user->org_id);

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('comments', 'like', '%' . $search . '%')
                    ->orWhereHas('member', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }
        $payments = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Payment/Index', [
            'payments' => $payments,
            'filters' => $request->only('search')
        ]);
    }

 }
