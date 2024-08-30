<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RatingRaController;
use App\Http\Controllers\ReviewRwController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/music', [MusicController::class, 'index']);
Route::get('/albums', [AlbumController::class, 'index']);
Route::get('/music/{id}', [MusicController::class, 'show']);
Route::get('/search', [MusicController::class, 'search']);
Route::post('/purchases', [PurchaseController::class, 'store']);
Route::get('/purchases', [PurchaseController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'updateMe']); // Add this line
});

Route::get('/debug', function () {
    return response()->json([
        'user' => auth()->user(),
        'token' => request()->bearerToken(),
        'server_time' => now(),
    ]);
});

Route::get('/debug/user', [DebugController::class, 'user']);
Route::get('/debug/server-time', [DebugController::class, 'serverTime']);
Route::get('/debug/all', [DebugController::class, 'all']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ratings', [RatingRaController::class, 'store']);
    Route::get('/ratings', [RatingRaController::class, 'store']);
    Route::get('/ratings/{musicId}', [RatingRaController::class, 'index']);
    Route::post('/reviews', [ReviewRwController::class, 'store']);
    Route::post('/get', [ReviewRwController::class, 'store']);
    Route::get('/reviews/{musicId}', [ReviewRwController::class, 'index']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware(['admin'])->group(function () {
    Route::put('/music/{id}', [MusicController::class, 'update']);
});

Route::middleware(['admin'])->group(function () {
    Route::post('/music/{id}', [MusicController::class, 'store']);
});

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/music-management', [MusicController::class, 'index']);
    Route::post('/admin/music-management', [MusicController::class, 'store']);
    Route::put('/admin/music-management/{id}', [MusicController::class, 'update']);
    Route::delete('/admin/music-management/{id}', [MusicController::class, 'destroy']);
});

Route::middleware(['admin'])->group(function () {
    Route::post('/music', [MusicController::class, 'store']);
    Route::put('/music/{id}', [MusicController::class, 'update']);
    Route::delete('/music/{id}', [MusicController::class, 'destroy']);
});

Route::get('/music/{id}', [MusicController::class, 'show']);
Route::get('/music', [MusicController::class, 'index']);

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/albums', [AlbumController::class, 'index']);
    Route::post('/admin/albums', [AlbumController::class, 'store']);
    Route::get('/admin/albums/{id}', [AlbumController::class, 'show']);
    Route::put('/admin/albums/{id}', [AlbumController::class, 'update']);
    Route::delete('/admin/albums/{id}', [AlbumController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/albums/add-music', [AlbumController::class, 'addMusicToAlbum']);
});

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::get('/admin/users/{id}', [UserController::class, 'show']);
    Route::put('/admin/users/{id}', [UserController::class, 'update']);
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
});

Route::middleware(['admin'])->group(function () {
    // Review routes
    Route::get('/admin/reviews', [ReviewRwController::class, 'getAll']);
    Route::get('/admin/reviews/{id}', [ReviewRwController::class, 'show']);
    Route::put('/admin/reviews/{id}', [ReviewRwController::class, 'update']);
    Route::delete('/admin/reviews/{id}', [ReviewRwController::class, 'destroy']);

    // Rating routes
    Route::get('/admin/ratings', [RatingRaController::class, 'getAll']);
    Route::get('/admin/ratings/{id}', [RatingRaController::class, 'show']);
    Route::put('/admin/ratings/{id}', [RatingRaController::class, 'update']);
    Route::delete('/admin/ratings/{id}', [RatingRaController::class, 'destroy']);
});
