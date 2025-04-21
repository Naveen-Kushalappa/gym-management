<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\OrganizationController;
use App\Http\Middleware\RoleMiddleware;
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

Route::middleware(['auth'])->group(function () {
    Route::get('admin/dashboard', [SuperAdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/organizations', [SuperAdminController::class, 'index'])->name('admin.organizations');

    Route::get('admin/editTimeSlots/{orgId}', [OrganizationController::class, 'indexTimeSlots'])->name('admin.editTimeslots');
    Route::post('admin/organizations/{orgId}/timeslots', [OrganizationController::class, 'updateTimeSlots'])->name('admin.timeslots.update');

});


require __DIR__.'/auth.php';
