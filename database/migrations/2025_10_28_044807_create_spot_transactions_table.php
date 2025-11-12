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
        Schema::create('spot_transactions', function (Blueprint $table) {
            $table->id('spot_transaction_id');
            $table->string('symbol', 20);
            $table->enum('type', ['buy', 'sell']);
            $table->decimal('index_price', 18, 4)->nullable();
            $table->decimal('unit_numbers', 18, 4)->nullable();
            $table->decimal('amount', 18, 2)->nullable();
            $table->timestamp('timestamp')->useCurrent();
            $table->decimal('profit', 18, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spot_transactions');
    }
};
