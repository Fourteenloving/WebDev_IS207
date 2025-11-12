<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('p2p_orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('merchant_id')->nullable();
            $table->enum('type', ['buy', 'sell']);
            $table->decimal('unit_numbers', 18, 4)->nullable();
            $table->enum('state', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamp('timestamp')->useCurrent();
            $table->unsignedBigInteger('transaction_id')->nullable();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('merchant_id')->references('user_id')->on('users')->onDelete('set null');
            $table->foreign('transaction_id')->references('transaction_id')->on('transactions')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p2p_orders');
    }
};
