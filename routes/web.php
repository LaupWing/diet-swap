<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    logger(Auth::user()->userGoal);
    return Inertia::render('Welcome', [
        'userGoal' => Auth::user()->userGoal,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/generate', [AiController::class, 'generate'])->name('generate');
Route::prefix('meals')->group(function () {
    Route::post('/analyze', [MealController::class, 'analyze'])->name('meals.analyze');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
