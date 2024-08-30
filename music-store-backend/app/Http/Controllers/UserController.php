<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'u_name' => 'required|string|max:255',
            'u_last_name' => 'required|string|max:255',
            'u_email' => 'required|string|email|max:255|unique:users_u,u_email,' . $id . ',u_id',
            'u_phone' => 'nullable|string|max:20',
            'u_status' => 'required|string|in:user,admin',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}

