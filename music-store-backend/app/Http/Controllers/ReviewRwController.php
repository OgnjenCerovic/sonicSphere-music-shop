<?php

namespace App\Http\Controllers;

use App\Models\ReviewRw;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewRwController extends Controller
{
    protected $fillable = [
        'rw_user_id',
        'rw_music_id',
        'rw_comment',
    ];

    public function store(Request $request)
    {
        $request->validate([
            'rw_music_id' => 'required|exists:music_m,m_id',
            'rw_comment' => 'required|string',
        ]);

        $review = ReviewRw::create([
            'rw_user_id' => User::getLoggedInId(),
            'rw_music_id' => $request->rw_music_id,
            'rw_comment' => $request->rw_comment,
        ]);

        return response()->json($review, 201);
    }

    public function index($musicId)
    {
        $reviews = ReviewRw::where('rw_music_id', $musicId)->with('user')->get();
        return response()->json($reviews);
    }

    public function getAll()
    {
        $ratings = ReviewRw::with(['user', 'music'])->get();
        return response()->json($ratings);
    }

    public function show($id)
    {
        $rating = ReviewRw::with(['user', 'music'])->findOrFail($id);
        return response()->json($rating);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'rw_comment' => 'required',
        ]);

        $rating = ReviewRw::findOrFail($id);
        $rating->update([
            'rw_comment' => $request->rw_comment,
        ]);

        return response()->json($rating);
    }

    public function destroy($id)
    {
        $rating = ReviewRw::findOrFail($id);
        $rating->delete();

        return response()->json(null, 204);
    }
}
