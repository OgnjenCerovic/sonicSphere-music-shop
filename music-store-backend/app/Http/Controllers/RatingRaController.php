<?php

namespace App\Http\Controllers;

use App\Models\RatingRa;
use App\Models\User;
use Illuminate\Http\Request;

class RatingRaController extends Controller
{
    protected $fillable = [
        'ra_user_id',
        'ra_music_id',
        'ra_rating',
    ];

    public function store(Request $request)
    {
        $request->validate([
            'ra_music_id' => 'required|exists:music_m,m_id',
            'ra_rating' => 'required|integer|min:1|max:5',
        ]);

        $rating = RatingRa::create([
            'ra_user_id' => User::getLoggedInId(),
            'ra_music_id' => $request->ra_music_id,
            'ra_rating' => $request->ra_rating,
        ]);

        return response()->json($rating, 201);
    }

    public function getAll()
    {
        $ratings = RatingRa::with(['user', 'music'])->get();
        return response()->json($ratings);
    }

    public function index($musicId)
    {
        $ratings = RatingRa::where('ra_music_id', $musicId)->with('user')->get();
        return response()->json($ratings);
    }

    public function show($id)
    {
        $rating = RatingRa::with(['user', 'music'])->findOrFail($id);
        return response()->json($rating);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'ra_rating' => 'required|integer|min:1|max:5',
        ]);

        $rating = RatingRa::findOrFail($id);
        $rating->update([
            'ra_rating' => $request->ra_rating,
        ]);

        return response()->json($rating);
    }

    public function destroy($id)
    {
        $rating = RatingRa::findOrFail($id);
        $rating->delete();

        return response()->json(null, 204);
    }
}
