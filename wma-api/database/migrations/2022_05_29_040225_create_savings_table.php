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
        Schema::create('savings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('saving_sector_id');
            $table->string('authority')->nullable();
            $table->float('amount')->default(0);
            $table->boolean('is_targeted')->default(false);
            $table->float('targeted_amount')->nullable();
            $table->float('targeted_date')->nullable();
            $table->float('next_installment_date')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('saving_sector_id');
            
            $table->foreign('user_id')->on('users')->references('id');
            $table->foreign('saving_sector_id')->on('saving_sectors')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('savings');
    }
};
