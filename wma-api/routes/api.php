<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenceSectorController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\IncomeSectorController;
use App\Http\Controllers\LoanSectorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SavingSectorController;
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
// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Auth Route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'profile']);
    Route::put('/change-name', [ProfileController::class, 'changeName']);
    Route::put('/change-email', [ProfileController::class, 'changeEmail']);
    Route::put('/change-phone', [ProfileController::class, 'changePhone']);
    Route::put('/change-password', [ProfileController::class, 'changePassword']);
    Route::put('/change-status', [ProfileController::class, 'changeStatus']);

    // Income Sector Routes
    Route::post('/add-income-sector', [IncomeSectorController::class, 'addIncomeSector']);
    Route::get('/show-single-income-sector/{id}', [IncomeSectorController::class, 'showSingleIncomeSector']);
    Route::get('/show-all-income-sectors', [IncomeSectorController::class, 'showAllIncomeSectors']);
    Route::put('/update-income-sector/{id}', [IncomeSectorController::class, 'updateIncomeSector']);
    Route::delete('/delete-income-sector/{id}', [IncomeSectorController::class, 'deleteIncomeSector']);

    // Income Routes
    Route::get('/income-history', [IncomeController::class, 'income-history']);
    Route::post('/add-income', [IncomeController::class, 'addIncome']);
    Route::delete('/delete-income/{id}', [IncomeController::class, 'deleteIncome']);
    Route::delete('/delete-income-history', [IncomeController::class, 'deleteIncomeHistory']);
    // Route::get('/show-single-income-sector/{id}', [IncomeController::class, 'showSingleIncomeSector']);
    // Route::get('/show-all-income-sectors', [IncomeController::class, 'showAllIncomeSectors']);
    // Route::put('/update-income-sector/{id}', [IncomeController::class, 'updateIncomeSector']);
    // Route::delete('/delete-income-sector/{id}', [IncomeController::class, 'deleteIncomeSector']);

    // Expence Sector Routes
    Route::post('/add-expence-sector', [ExpenceSectorController::class, 'addExpenceSector']);
    Route::get('/show-single-expence-sector/{id}', [ExpenceSectorController::class, 'showSingleExpenceSector']);
    Route::get('/show-all-expence-sectors', [ExpenceSectorController::class, 'showAllExpenceSectors']);
    Route::put('/update-expence-sector/{id}', [ExpenceSectorController::class, 'updateExpenceSector']);
    Route::delete('/delete-expence-sector/{id}', [ExpenceSectorController::class, 'deleteExpenceSector']);

    // Loan Sector Routes
    Route::post('/add-loan-sector', [LoanSectorController::class, 'addLoanSector']);
    Route::get('/show-single-loan-sector/{id}', [LoanSectorController::class, 'showSingleLoanSector']);
    Route::get('/show-all-loan-sectors', [LoanSectorController::class, 'showAllLoanSectors']);
    Route::put('/update-loan-sector/{id}', [LoanSectorController::class, 'updateLoanSector']);
    Route::delete('/delete-loan-sector/{id}', [LoanSectorController::class, 'deleteLoanSector']);

    // Savings Sector Routes
    Route::post('/add-saving-sector', [SavingSectorController::class, 'addSavingSector']);
    Route::get('/show-single-saving-sector/{id}', [SavingSectorController::class, 'showSingleSavingSector']);
    Route::get('/show-all-saving-sectors', [SavingSectorController::class, 'showAllSavingSectors']);
    Route::put('/update-saving-sector/{id}', [SavingSectorController::class, 'updateSavingSector']);
    Route::delete('/delete-saving-sector/{id}', [SavingSectorController::class, 'deleteSavingSector']);
});
