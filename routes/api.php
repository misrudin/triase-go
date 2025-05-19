<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChecklistItemController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\TriageController;
use App\Http\Controllers\TriageLevelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::get('/triage-level/options', [TriageLevelController::class, 'getAll']);
    Route::apiResource('triage-level', TriageLevelController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::get('/category/options', [CategoryController::class, 'getAll']);
    Route::apiResource('category', CategoryController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::get('/checklist-item/options', [ChecklistItemController::class, 'getAll']);
    Route::apiResource('checklist-item', ChecklistItemController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::apiResource('user', UserController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::apiResource('patient', PatientController::class)
        ->only(['index']);

    Route::get('triage/checklist-item', [TriageController::class, 'getChecklistItem']);
    Route::apiResource('triage', TriageController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::put('password', [PasswordController::class, 'update']);
});