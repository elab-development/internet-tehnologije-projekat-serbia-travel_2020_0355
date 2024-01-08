<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/countries', [CountryController::class, 'index']);
Route::post('/api/countries', [CountryController::class, 'store']);

Route::put('/api/countries/{countryId}', [CountryController::class, 'update']);
Route::delete('/api/countries/{countryId}', [CountryController::class, 'destroy']);

Route::get('/bookings/export-pdf/{hotelId}', 'App\Http\Controllers\BookingController@exportToPDF');
