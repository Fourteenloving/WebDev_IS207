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
        Schema::create('future_orders', function (Blueprint $table) {
            $table->id('future_order_id');
            $table->unsignedBigInteger('wallet_id');
            $table->string('symbol', 20);
            $table->decimal('leverage', 5, 2)->nullable();
            $table->timestamp('opentimestamp')->useCurrent();
            $table->timestamp('closetimestamp')->nullable();
            $table->decimal('profit', 18, 2)->nullable();
            $table->foreign('wallet_id')
              ->references('wallet_id')
              ->on('wallets')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('future_orders');
    }
};
