<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'profile']);
    Route::put('/change-name', [ProfileController::class, 'changeName']);
    Route::put('/change-email', [ProfileController::class, 'changeEmail']);
    Route::put('/change-phone', [ProfileController::class, 'changePhone']);
    Route::put('/change-password', [ProfileController::class, 'changePassword']);
    Route::put('/change-status', [ProfileController::class, 'changeStatus']);

});
