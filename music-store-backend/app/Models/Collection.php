<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $table = 'collections_c';
    protected $primaryKey = 'c_id';
    public $timestamps = false;

    protected $fillable = [
        'c_music_id',
        'c_album_id',
        'c_modified_at',
        'c_created_at',
    ];
}
