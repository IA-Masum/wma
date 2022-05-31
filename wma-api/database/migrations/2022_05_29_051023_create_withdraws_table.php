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
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('saving_id');
            $table->float('amount');
            $table->string('purpose', 255);
            $table->string('note', 255)->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('saving_id');
            $table->foreign('user_id')->on('users')->references('id');
            $table->foreign('saving_id')->on('savings')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('withdraws');
    }
};
