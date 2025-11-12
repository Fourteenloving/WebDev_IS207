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
        Schema::create('crypto_transfers', function (Blueprint $table) {
            $table->id('crypto_transfer_id');
            $table->unsignedBigInteger('source_wallet_id')->nullable();
            $table->unsignedBigInteger('target_wallet_id')->nullable();
            $table->string('symbol', 20);
            $table->decimal('unit_numbers', 18, 4)->nullable();
            $table->timestamps();

            $table->foreign('source_wallet_id')->references('wallet_id')->on('wallets')->onDelete('cascade');
            $table->foreign('target_wallet_id')->references('wallet_id')->on('wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crypto_transfers');
    }
};
