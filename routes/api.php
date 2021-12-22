<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
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


Route::middleware(['auth:api'])->get('user', function (Request $request) {
    return $request->user();
});

Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('/products', [ProductController::class, 'index'])->middleware('auth:api');
Route::post('/products', [ProductController::class, 'store'])->middleware('auth:api');
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('auth:api');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
