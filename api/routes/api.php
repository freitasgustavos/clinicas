<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/token', 'API\AuthController@login');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::post('auth/logout', 'API\AuthController@logout');
    Route::post('auth/refresh', 'API\AuthController@refresh');
    Route::post('auth/me', 'API\AuthController@me');

    Route::resource('clinics', 'API\ClinicController', ['except' => ['create', 'edit']]);
    Route::get('regionals', 'API\RegionalController@index');
    Route::get('specialties', 'API\SpecialtyController@index');
});
