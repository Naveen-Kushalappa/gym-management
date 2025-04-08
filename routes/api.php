
<?php

use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/members', [MemberController::class, 'index']);
    Route::post('/members', [MemberController::class, 'store']);
    Route::delete('/members/{id}', [MemberController::class, 'destroy']);
});
