<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users_u,u_email',
            'phone' => 'required|string|max:15',
            'password' => 'required|string|min:8',
        ]);

        // Kreiraj korisnika
        $user = User::create([
            'u_name' => $request->name,
            'u_last_name' => $request->last_name,
            'u_email' => $request->email,
            'u_phone' => $request->phone,
            'u_status' => 'user',
            'u_password' => $request->password, // Sačuvaj lozinku u čistom tekstu
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    /*
     * //hash
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users_u,u_email',
            'phone' => 'required|string|max:15', // Dodaj ovo ako želiš validaciju za telefon
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'u_name' => $request->name,
            'u_email' => $request->email,
            'u_last_name' => $request->last_name ?? '', // Dodaj ako je potrebno
            'u_phone' => $request->phone ?? '', // Dodaj ako je potrebno
            'u_status' => 'user', // ili postavi prema potrebi
            'u_password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }*/

    /*
     * //hash
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('u_email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }
    */

    public function updateMe(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:15',
        ]);

        $user = User::find(User::getLoggedInId());
        $user->u_name = $request->input('name');
        $user->u_last_name = $request->input('last_name');
        $user->u_email = $request->input('email');
        $user->u_phone = $request->input('phone');

        if ($request->has('password') && $request->password) {
            $request->validate([
                'password' => 'string|min:8|confirmed',
            ]);
            $user->u_password = Hash::make($request->password);
        }

        $user->save();

        return response()->json($user);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Preuzmi korisnika iz baze
        $user = User::where('u_email', $request->email)->first();

        if(!$user){
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }

        // Ako korisnik ne postoji ili lozinka nije tačna
        if ($user->u_password !== $request->password) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }

        // Kreiraj token i vrati ga kao odgovor
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
