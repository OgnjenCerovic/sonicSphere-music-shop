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
        Schema::create('users_u', function (Blueprint $table) {
            $table->id('u_id');
            $table->string('u_name');
            $table->string('u_last_name');
            $table->string('u_email')->unique();
            $table->string('u_phone');
            $table->string('u_password');
            $table->enum('u_status', ['user', 'admin']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
