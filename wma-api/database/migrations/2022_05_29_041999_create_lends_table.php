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
        Schema::create('lends', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('person');
            $table->string('status', 8)->default('Unpaid'); // Paid, Unpaid
            $table->float('amount');
            $table->float('paid_amount')->default(0);
            $table->string('target_paid_date')->nullable();
            $table->string('next_installment_date')->nullable();
            $table->string('note')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->foreign('user_id')->on('users')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lends');
    }
};
