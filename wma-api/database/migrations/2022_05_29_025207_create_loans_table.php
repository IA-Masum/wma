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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('loan_sector_id');
            $table->string('source');
            $table->string('status', 8)->default('Unpaid'); // Paid, Unpaid
            $table->string('purpose', 100);
            $table->float('amount');
            $table->float('paid_amount')->default(0);
            $table->string('target_paid_date')->nullable();
            $table->string('next_installment_date')->nullable();
            $table->string('note')->nullable();
            $table->timestamps();

            $table->index('loan_sector_id');
            $table->index('user_id');
            $table->foreign('user_id')->on('users')->references('id');
            $table->foreign('loan_sector_id')->on('loan_sectors')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loans');
    }
};
