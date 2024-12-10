<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\ProfileController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware("auth")->group(function () {
    Route::get('/', function () {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $timezone = $user->userInfo->timezone;

        return Inertia::render('Welcome', [
            'userGoal' => Auth::user()->userGoal,
            'credits' => Auth::user()->credits,
        ]);
    });

    Route::get('/api/meals', function (Request $request) {
        $date = Carbon::parse($request->query('date'));
        $meals = $request->user()->pictures()->whereDate('created_at', $date)->with('meal')->get();

        return response()->json([
            'meals' => $meals
        ]);
    })->name('meals.date');

    Route::prefix('meals')->group(function () {
        Route::post('/analyze', [MealController::class, 'analyze'])->name('meals.analyze');
        Route::get('/', [MealController::class, 'getMeals'])->name('meals.get');
        Route::get('/{meal}/swap', [MealController::class, 'swapMeal'])->name('meals.swap');
    });
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/generate', [AiController::class, 'generate'])->name('generate');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
