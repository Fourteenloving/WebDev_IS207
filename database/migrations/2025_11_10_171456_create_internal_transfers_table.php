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
        Schema::create('internal_transfers', function (Blueprint $table) {
            $table->id('internal_transfer_id');
            $table->unsignedBigInteger('source_wallet_id');
            $table->unsignedBigInteger('target_wallet_id');
            $table->decimal('transfer_amount', 18, 2)->nullable();
            $table->timestamp('timestamp')->useCurrent();
            $table->foreign('source_wallet_id')->references('wallet_id')->on('wallets')->onDelete('cascade');
            $table->foreign('target_wallet_id')->references('wallet_id')->on('wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internal_transfers');
    }
};
