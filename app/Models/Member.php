<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Support\Str;

class Member extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }

    protected $fillable = ['name', 'gender', 'is_active', 'org_id'];

    public function payments(){
        return $this->hasMany(Payment::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
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
