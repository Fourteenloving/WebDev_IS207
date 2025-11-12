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
        Schema::create('properties', function (Blueprint $table) {
            $table->string('symbol',20);
            $table->unsignedBigInteger('wallet_id');
            $table->decimal('average_buy_price', 18, 4);
            $table->decimal('unit_number', 18, 4);
            $table->primary(['symbol', 'wallet_id']);
            $table->foreign('wallet_id')->references('wallet_id')->on('wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
