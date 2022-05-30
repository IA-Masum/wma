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
        Schema::create('expences', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('expence_sector_id');
            $table->float('amount');
            $table->string('source');
            $table->string('note')->nullable();
            $table->timestamps();

            $table->index('expence_sector_id');
            $table->index('user_id');
            $table->foreign('user_id')->on('users')->references('id');
            $table->foreign('expence_sector_id')->on('expence_sectors')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expences');
    }
};
