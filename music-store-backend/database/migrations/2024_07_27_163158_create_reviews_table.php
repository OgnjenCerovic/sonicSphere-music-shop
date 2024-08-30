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
        Schema::create('reviews_rw', function (Blueprint $table) {
            $table->id('rw_id');
            $table->unsignedBigInteger('rw_music_id');
            $table->unsignedBigInteger('rw_user_id');
            $table->text('rw_comment');
            $table->timestamps();

            $table->foreign('rw_music_id')->references('m_id')->on('music')->onDelete('cascade');
            $table->foreign('rw_user_id')->references('u_id')->on('users_u')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews_rw');
    }
};
