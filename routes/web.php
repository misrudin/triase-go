<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChecklistItemController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TreatmentsController;
use App\Http\Controllers\TriageLevelController;
use App\Http\Controllers\TriageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTriageController;
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

Route::middleware('guest')->group(function () {
  Route::post('/login', [LoginController::class, 'login'])->name('login');
  Route::get('/login', [LoginController::class, 'index'])->name(name: 'user.login');
});

Route::middleware(['auth'])->group(function () {
  Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

  Route::inertia('/', 'Admin/Dashboard')->name('admin.dashboard');

  Route::resource('triage-level', TriageLevelController::class)
    ->only(['index', 'store', 'update', 'destroy']);

  Route::resource('checklist-item', ChecklistItemController::class)
    ->only(['index', 'store', 'update', 'destroy']);

  Route::resource('user', UserController::class)
    ->only(['index', 'store', 'update', 'destroy']);

  Route::resource('category', CategoryController::class)
    ->only(['index', 'store', 'update', 'destroy']);

  Route::resource('data-pasien', PatientController::class)
    ->only(['index']);

  Route::resource('treatments', TreatmentsController::class)
    ->only(['index']);
  Route::resource('triage', TriageController::class)
    ->only(['index']);
  Route::resource('profile', ProfileController::class)
    ->only(['index']);

  Route::get('password', [PasswordController::class, 'index']);
  Route::put('password', [PasswordController::class, 'update']);
  Route::resource('/', HomeController::class)
    ->only('index');
  Route::resource('/triage', UserTriageController::class)
    ->only(['index', 'store']);
});
