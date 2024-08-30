<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Music;
use Illuminate\Support\Facades\Auth;

class MusicController extends Controller
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'music_m';

    public function index()
    {
        // Prikaz svih muzika
        $music = Music::all();
        return response()->json($music);
    }

    public function store(Request $request)
    {
        $request->validate([
            'm_title' => 'required|string|max:255',
            'm_description' => 'nullable|string',
            'm_media' => 'required', // Adjust validation rules as needed
        ]);

        $music = new Music();
        $music->m_title = $request->m_title;
        $music->m_description = $request->m_description;
        $music->m_media = $request->m_media;
        $music->save();

        return response()->json($music, 201); // Return newly created music with 201 status code
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'm_title' => 'required|string|max:255',
            'm_description' => 'nullable|string',
            'm_media' => 'required', // Adjust validation rules as needed
        ]);

        $music = Music::find($id);

        if (!$music) {
            return response()->json(['message' => 'Music not found'], 404);
        }

        $music->m_title = $request->m_title;
        $music->m_description = $request->m_description;
        $music->m_media = $request->m_media;
        $music->save();

        return response()->json($music);
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        $music = Music::find($id);

        if (!$music) {
            return response()->json(['message' => 'Music not found'], 404);
        }

        $music->delete();

        return response()->json(['message' => 'Music deleted successfully']);
    }

    public function show($id)
    {
        $music = Music::find($id);

        if (!$music) {
            return response()->json(['message' => 'Music not found'], 404);
        }

        $user_id = User::getLoggedInId();

        if($user_id === null){
            $music->download_link = null;
        }else{
            $purchased = Purchase::where('p_music_id', $id)->where('p_user_id', $user_id);

            if ($purchased->count() > 0) {
                $music->download_link = url('path/to/music/' . $music->m_media);
            }else{
                $music->download_link = null;
            }
        }

        return response()->json($music);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');


        if ($query) {
            $results = Music::where('m_title', 'LIKE', '%' . $query . '%')->get();
            return response()->json($results);
        }

        return response()->json([]);
    }
}
