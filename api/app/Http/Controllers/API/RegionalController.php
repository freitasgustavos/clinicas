<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegionalController extends Controller
{
    public function index() 
    { 
        return \App\Regional::all(); 
    }
}
