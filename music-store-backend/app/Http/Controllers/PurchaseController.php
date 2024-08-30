<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        // Validacija zahteva
        $request->validate([
            'p_music_id' => 'required|integer|exists:music_m,m_id',
            'p_user_id' => 'required|integer|exists:users_u,u_id',
        ]);

        $userId = $request->p_user_id;
        $musicId = $request->p_music_id;

        // Proveri da li je korisnik već kupio ovu muziku
        $existingPurchase = Purchase::where('p_user_id', $userId)
            ->where('p_music_id', $musicId)
            ->first();

        if ($existingPurchase) {
            return response()->json(['message' => 'You have already purchased this music.'], 400);
        }

        // Kreiranje nove kupovine
        $purchase = new Purchase();
        $purchase->p_music_id = $request->p_music_id;
        $purchase->p_user_id = $request->p_user_id;
        $purchase->created_at = now();
        $purchase->updated_at = now();
        $purchase->save();

        return response()->json($purchase, 201);
    }

    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $purchases = Purchase::where('p_user_id', $userId)->get();
        return response()->json($purchases);
    }
}
