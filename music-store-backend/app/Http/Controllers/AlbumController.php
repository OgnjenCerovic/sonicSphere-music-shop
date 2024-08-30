<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Collection;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index()
    {
        return Album::all();
    }

    public function addMusicToAlbum(Request $request)
    {
        $request->validate([
            'c_music_id' => 'required|exists:music_m,m_id',
            'c_album_id' => 'required|exists:album_a,a_id',
        ]);

        $collection = new Collection();
        $collection->c_music_id = $request->c_music_id;
        $collection->c_album_id = $request->c_album_id;
        $collection->save();

        return response()->json(['message' => 'Music added to album successfully!'], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'a_title' => 'required|string|max:255',
            'a_description' => 'required|string',
        ]);

        $album = new Album();
        $album->a_title = $request->a_title;
        $album->a_description = $request->a_description;
        $album->save();

        return response()->json($album, 201);
    }

    public function show($id)
    {
        return Album::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'a_title' => 'required|string|max:255',
            'a_description' => 'required|string',
        ]);

        $album = Album::findOrFail($id);
        $album->a_title = $request->a_title;
        $album->a_description = $request->a_description;
        $album->save();

        return response()->json($album);
    }

    public function destroy($id)
    {
        Album::destroy($id);
        return response()->json(['message' => 'Album deleted successfully']);
    }
}
