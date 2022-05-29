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
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('income_sector_id');
            $table->float('amount');
            $table->string('source');
            $table->string('note')->nullable();
            $table->timestamps();

            $table->index('income_sector_id');
            $table->index('user_id');
            $table->foreign('user_id')->on('users')->references('id');
            $table->foreign('income_sector_id')->on('income_sectors')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incomes');
    }
};
