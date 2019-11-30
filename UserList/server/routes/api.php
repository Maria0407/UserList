<?php

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

Route::get('persons','PersonController@index');
Route::get('persons/{id}','PersonController@show');
Route::post('persons','PersonController@store');
Route::put('persons/{id}','PersonController@update');
Route::delete('persons/{id}','PersonController@delete');
