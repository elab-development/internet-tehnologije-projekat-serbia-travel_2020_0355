<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\RoomController;
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
Route::resource('bookings', BookingController::class);
Route::resource('rooms', RoomController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('bookings/user/{userId}', 'App\Http\Controllers\BookingController@getUserBookings');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
    Route::resource('destinations', DestinationController::class)->only(['store', 'update', 'destroy']);
    Route::resource('hotels', HotelController::class)->only(['store', 'update', 'destroy']);
    Route::resource('rooms', RoomController::class)->only(['store', 'update', 'destroy']);
    Route::resource('bookings', BookingController::class)->only(['store']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
