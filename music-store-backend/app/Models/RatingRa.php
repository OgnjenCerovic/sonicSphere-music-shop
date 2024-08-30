<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingRa extends Model
{
    use HasFactory;

    protected $table = 'ratings_ra';

    protected $primaryKey = 'ra_id';

    protected $fillable = ['ra_music_id', 'ra_user_id', 'ra_rating'];

    public function user()
    {
        return $this->belongsTo(User::class, 'ra_user_id', 'u_id');
    }

    public function music()
    {
        return $this->belongsTo(Music::class, 'ra_music_id', 'm_id');
    }
}
