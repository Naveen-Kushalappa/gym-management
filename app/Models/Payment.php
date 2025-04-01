<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['member_id','month','year','status'];

    public function member(){
        return $this->belongsTo(Member::class);
    }
}
