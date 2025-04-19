<?php

namespace App\Models;

use App\Models\Scopes\ActiveOrganizationScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Organization extends Model
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

    protected $fillable = [
        'name',
        'address',
        'contact_number',
        'email',
        'is_active',
    ];

    public $casts = [
        'is_active' => 'boolean',
    ];

    public function members(): HasMany
    {
        return $this->hasMany(Member::class, 'org_id', 'id');
    }

    public function timeSlots(): HasMany{
        return $this->hasMany(OrgTimeSlot::class, 'org_id', 'id');
    }

    protected static function booted()
    {
        static::addGlobalScope(new ActiveOrganizationScope);
    }
}
