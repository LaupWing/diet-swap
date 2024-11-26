<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\ProfileController;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    /** @var \App\Models\User $user **/
    $user = Auth::user();
    $timezone = $user->userInfo->timezone;

    $startOfDay = Carbon::now($timezone)->startOfDay()->setTimezone('UTC');
    $endOfDay = Carbon::now($timezone)->endOfDay()->setTimezone('UTC');

    $pictures = $user->pictures()
        ->with('meal')
        ->whereBetween('created_at', [$startOfDay, $endOfDay])
        ->orderBy('created_at', 'asc')
        ->get();

    return Inertia::render('Welcome', [
        'userGoal' => Auth::user()->userGoal,
        'pictures' => $pictures
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
