<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Member extends Authenticable
{
    use HasFactory, Notifiable;

    use SoftDeletes;


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

    public function payments(): HasMany{
        return $this->hasMany(Payment::class, 'member_id', 'id');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'org_id', 'id');
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
