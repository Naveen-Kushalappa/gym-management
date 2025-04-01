<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('members.index');
});

Route::resource('members', MemberController::class);
Route::post('payments/{member}', [PaymentController::class, 'store'])->name('payments.store');
