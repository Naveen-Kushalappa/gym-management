<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class OrgTimeSlot extends Model
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
    protected $fillable = ['org_id', 'start_time', 'end_time'];

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('orderByStartTime', function (Builder $builder) {
            $builder->orderBy('start_time');
        });
    }

    protected $hidden = ['created_at', 'updated_at'];
}
