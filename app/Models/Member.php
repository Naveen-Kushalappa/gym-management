<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

}
