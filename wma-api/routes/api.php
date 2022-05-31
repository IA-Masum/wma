<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenceController;
use App\Http\Controllers\ExpenceSectorController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\IncomeSectorController;
use App\Http\Controllers\LendController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LoanSectorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SavingController;
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
    Route::get('/income-history', [IncomeController::class, 'incomeHistory']);
    Route::post('/add-income', [IncomeController::class, 'addIncome']);
    Route::delete('/delete-income/{id}', [IncomeController::class, 'deleteIncome']);
    Route::delete('/delete-income-history', [IncomeController::class, 'deleteIncomeHistory']);

    // Expence Sector Routes
    Route::post('/add-expence-sector', [ExpenceSectorController::class, 'addExpenceSector']);
    Route::get('/show-single-expence-sector/{id}', [ExpenceSectorController::class, 'showSingleExpenceSector']);
    Route::get('/show-all-expence-sectors', [ExpenceSectorController::class, 'showAllExpenceSectors']);
    Route::put('/update-expence-sector/{id}', [ExpenceSectorController::class, 'updateExpenceSector']);
    Route::delete('/delete-expence-sector/{id}', [ExpenceSectorController::class, 'deleteExpenceSector']);

    // Expence Routes
    Route::get('/expence-history', [ExpenceController::class, 'expenceHistory']);
    Route::post('/add-expence', [ExpenceController::class, 'addExpence']);
    Route::delete('/delete-expence/{id}', [ExpenceController::class, 'deleteExpence']);
    Route::delete('/delete-expence-history', [ExpenceController::class, 'deleteExpenceHistory']);

    // Loan Sector Routes
    Route::post('/add-loan-sector', [LoanSectorController::class, 'addLoanSector']);
    Route::get('/show-single-loan-sector/{id}', [LoanSectorController::class, 'showSingleLoanSector']);
    Route::get('/show-all-loan-sectors', [LoanSectorController::class, 'showAllLoanSectors']);
    Route::put('/update-loan-sector/{id}', [LoanSectorController::class, 'updateLoanSector']);
    Route::delete('/delete-loan-sector/{id}', [LoanSectorController::class, 'deleteLoanSector']);

    // Loan Routes
    Route::get('/loan-history', [LoanController::class, 'loanHistory']);
    Route::post('/add-loan', [LoanController::class, 'addLoan']);
    Route::delete('/delete-loan/{id}', [LoanController::class, 'deleteLoan']);
    Route::delete('/delete-loan-history', [LoanController::class, 'deleteLoanHistory']);
    Route::post('/give-loan-installment', [LoanController::class, 'giveInstallment']);

    // Savings Sector Routes
    Route::post('/add-saving-sector', [SavingSectorController::class, 'addSavingSector']);
    Route::get('/show-single-saving-sector/{id}', [SavingSectorController::class, 'showSingleSavingSector']);
    Route::get('/show-all-saving-sectors', [SavingSectorController::class, 'showAllSavingSectors']);
    Route::put('/update-saving-sector/{id}', [SavingSectorController::class, 'updateSavingSector']);
    Route::delete('/delete-saving-sector/{id}', [SavingSectorController::class, 'deleteSavingSector']);

    // Saving Routes
    Route::get('/saving-history', [SavingController::class, 'savingHistory']);
    Route::post('/add-saving', [SavingController::class, 'addSaving']);
    Route::delete('/delete-saving/{id}', [SavingController::class, 'deleteSaving']);
    Route::delete('/delete-saving-history', [SavingController::class, 'deleteSavingHistory']);
    Route::post('/give-saving-installment', [SavingController::class, 'giveInstallment']);
    Route::post('/withdraw-saving', [SavingController::class, 'withDraw']);

    // Lend Routes
    Route::get('/lend-history', [LendController::class, 'lendHistory']);
    Route::post('/add-lend', [LendController::class, 'addLend']);
    Route::delete('/delete-lend/{id}', [LendController::class, 'deleteLend']);
    Route::delete('/delete-lend-history', [LendController::class, 'deleteLendHistory']);
    Route::post('/give-lend-installment', [LendController::class, 'giveInstallment']);
});
