<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('members', MemberController::class);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/addPayment', [PaymentController::class, 'create'])->name('add-payment');

    Route::post('/addPayment', [PaymentController::class, 'store'])->name('store-payment');

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments');
});

Route::get('register/{orgId?}', [MemberController::class, 'register'])->name('register');

Route::post('register', [MemberController::class, 'registerMember'])->name('registerMember');



require __DIR__.'/auth.php';
