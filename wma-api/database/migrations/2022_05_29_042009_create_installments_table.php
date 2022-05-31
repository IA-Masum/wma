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
        Schema::create('installments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('type'); // Loan, Saving, Lend
            $table->unsignedBigInteger('loan_id')->nullable();
            $table->unsignedBigInteger('saving_id')->nullable();
            $table->unsignedBigInteger('lend_id')->nullable();
            $table->float('amount');
            $table->string('note', 255)->nullable();
            $table->timestamps();

            $table->index('type');
            $table->index('user_id');
            $table->index('loan_id');
            $table->index('saving_id');
            $table->index('lend_id');

            $table->foreign('user_id')->on('users')->references('id')->onDelete('cascade');
            $table->foreign('loan_id')->on('loans')->references('id')->onDelete('cascade');
            $table->foreign('saving_id')->on('savings')->references('id')->onDelete('cascade');
            $table->foreign('lend_id')->on('lends')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('installments');
    }
};
