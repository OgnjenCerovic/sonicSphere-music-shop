<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users_u,u_email,' . Auth::id(),
            'phone' => 'sometimes|required|string|max:15',
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);

        $user_id = User::getLoggedInId();
        $user = User::find($user_id);
        if ($request->has('name')) $user->u_name = $request->name;
        if ($request->has('last_name')) $user->u_last_name = $request->last_name;
        if ($request->has('email')) $user->u_email = $request->email;
        if ($request->has('phone')) $user->u_phone = $request->phone;
        if ($request->has('password')) $user->u_password = Hash::make($request->password);

        $user->save();

        return response()->json(['message' => 'Profile updated successfully']);
    }
}

