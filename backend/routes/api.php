<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\StarWarsController;
use App\Http\Controllers\Api\V1\DatadogAnalyticsController;

use DDTrace\Attributes\Trace;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::get('star-wars/people', [StarWarsController::class, 'searchPeople']);
    Route::get('star-wars/person', [StarWarsController::class, 'getPerson']);
    Route::get('star-wars/movies', [StarWarsController::class, 'searchMovies']);
    Route::get('star-wars/movie', [StarWarsController::class, 'getMovie']);
    Route::get('/analytics', [DatadogAnalyticsController::class, 'getDashboardData']);
});


