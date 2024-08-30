<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings_ra', function (Blueprint $table) {
            $table->id('ra_id');
            $table->unsignedBigInteger('ra_music_id');
            $table->unsignedBigInteger('ra_user_id');
            $table->integer('ra_rating');
            $table->timestamps();

            $table->foreign('ra_music_id')->references('m_id')->on('music')->onDelete('cascade');
            $table->foreign('ra_user_id')->references('u_id')->on('users_u')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ratings_ra');
    }
};
