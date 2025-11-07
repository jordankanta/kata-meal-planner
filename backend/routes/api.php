<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;

Route::prefix('recipes')->group(function () {
    Route::get('/', [RecipeController::class, 'index']);
    Route::get('/{id}', [RecipeController::class, 'show']);
});
