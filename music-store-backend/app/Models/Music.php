<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Music extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    // Definiši ime tabele
    protected $table = 'music_m';

    // Definiši kolone koje mogu biti masovno popunjene
    protected $fillable = [
        'm_title',
        'm_description',
        'm_media',
        'm_modified_at',
        'm_created_at'
    ];

    // Definiši primarni ključ
    protected $primaryKey = 'm_id';
}
