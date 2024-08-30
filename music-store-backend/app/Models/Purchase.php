<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Purchase extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'purchases_p'; // Dodaj ime tabele

    protected $primaryKey = 'p_id';

    // Definiši kolone koje se mogu masovno popuniti
    protected $fillable = [
        'p_music_id',
        'p_user_id',
        'created_at',
        'updated_at',
    ];

    // Ako koristiš timestamp polja koja nisu "created_at" i "updated_at"
    public $timestamps = false;
}
