<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Member extends Authenticable
{
    use HasFactory, Notifiable;

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

    protected $fillable = ['name', 'gender', 'is_active', 'org_id', 'role',
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected $appends = ['has_paid_this_month'];

}
