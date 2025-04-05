<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Member extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'gender', 'is_active'];

    public function payments(){
        return $this->hasMany(Payment::class);
    }

    protected $attributes = [
        'is_active' => true
    ];

    public function getHasPaidThisMonthAttribute()
    {
        $currentMonth = intval(Carbon::now()->format('m'));
        $currentYear = Carbon::now()->format('Y');

        return $this->payments->contains(function ($payment) use ($currentMonth, $currentYear) {
            return $payment->month == $currentMonth && $payment->year == $currentYear;
        });
    }

    protected $appends = ['has_paid_this_month'];

}
