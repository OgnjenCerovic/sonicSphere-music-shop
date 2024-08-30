<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class DebugController extends Controller
{
    // Vraća informacije o korisniku
    public function user(Request $request)
    {


        $token = PersonalAccessToken::findToken(request()->bearerToken());
        //$user = $token->tokenable;

        return response()->json([
            'user' => $token,
            'token' => request()->bearerToken(),
            "value" => $token["tokenable_id"]
        ]);
    }

    // Vraća server vreme
    public function serverTime()
    {
        return response()->json([
            'server_time' => now(),
        ]);
    }

    // Vraća sve dostupne informacije
    public function all()
    {
        return response()->json([
            'user' => Auth::user(),
            'token' => request()->bearerToken(),
            'server_time' => now(),
            'env' => env('APP_ENV'),
            'app_name' => env('APP_NAME'),
        ]);
    }
}

