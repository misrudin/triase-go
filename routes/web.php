<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


Route::prefix('admin')->group(function () {
  Route::inertia('/login', 'Admin/Login')->name('admin.login');

  Route::middleware(['auth', 'admin'])->group(function () {
    Route::inertia('/', 'Admin/Dashboard')->name('admin.dashboard');
  });
});
