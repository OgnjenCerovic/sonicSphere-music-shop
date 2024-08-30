<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewRw extends Model
{
    use HasFactory;

    protected $table = 'reviews_rw';

    protected $primaryKey = 'rw_id';

    protected $fillable = ['rw_music_id', 'rw_user_id', 'rw_comment'];

    public function user()
    {
        return $this->belongsTo(User::class, 'rw_user_id', 'u_id');
    }

    public function music()
    {
        return $this->belongsTo(Music::class, 'rw_music_id', 'm_id');
    }
}
