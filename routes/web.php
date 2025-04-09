<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::resource('members', MemberController::class)->middleware(['auth']);

Route::post('payments/{member}', [PaymentController::class, 'store'])->name('payments.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'user' => Auth::user()
    ]);
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
