<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::resource('members', MemberController::class)->middleware(['auth']);

//Route::post('payments/{member}', [PaymentController::class, 'store'])->name('payments.store');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

Route::get('/addPayment', [PaymentController::class, 'create'])->middleware(['auth'])->name('add-payment');

Route::post('/addPayment', [PaymentController::class, 'store'])->middleware(['auth'])->name('store-payment');

require __DIR__.'/auth.php';
