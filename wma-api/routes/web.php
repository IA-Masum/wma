<?php

use App\Mail\VarificationEmail;
use Illuminate\Support\Facades\Mail;
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
    $code = rand(100000, 999999);
    // Mail::to('iamasum133@gmail.com')->send( new VarificationEmail($code));
    return new VarificationEmail($code);
});
