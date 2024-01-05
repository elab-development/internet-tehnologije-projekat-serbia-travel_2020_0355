<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DestinationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('destinations', DestinationController::class);
Route::resource('users', UserController::class);
Route::resource('hotels', HotelController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::resource('destinations', DestinationController::class)->only(['index','store']); // dodaj exception handling kad neko pokusa da uradi bez autorizacije

    Route::post('/logout', [AuthController::class, 'logout']);
});
