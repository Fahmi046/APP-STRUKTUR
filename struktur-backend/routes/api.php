<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\KaryawanController;
use App\Http\Controllers\Api\VendorController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\ClientController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('sdm', KaryawanController::class);
Route::apiResource('vendor', VendorController::class);
Route::apiResource('material', MaterialController::class);
Route::apiResource('template', TemplateController::class);
Route::apiResource('client', ClientController::class);
Route::get('/marketing-pics', [KaryawanController::class, 'getMarketingPics']);
