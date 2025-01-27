<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ChecklistItemController;
use App\Http\Controllers\MedicalStaffController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TriageLevelController;
use App\Http\Controllers\UserController;
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
  Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name('admin.login');
    Route::post('/login', [LoginController::class, 'login'])->name('admin.login');
  });

  Route::middleware(['auth', 'admin'])->group(function () {
    Route::inertia('/', 'Admin/Dashboard')->name('admin.dashboard');
    Route::post('/logout', [LoginController::class, 'logout'])->name('admin.logout');

    Route::resource('triage-level', TriageLevelController::class)
      ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('checklist-item', ChecklistItemController::class)
      ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('medical-staff', MedicalStaffController::class)
      ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('user', UserController::class)
      ->only(['index', 'store', 'update', 'destroy']);

    Route::get('password', [PasswordController::class, 'index']);
    Route::put('password', [PasswordController::class, 'update']);
  });
});
