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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->string('source_account_number', 50)->nullable();
            $table->string('target_account_number', 50)->nullable();
            $table->decimal('transaction_amount', 18, 2);
            $table->timestamp('timestamp')->useCurrent();
            $table->foreign('source_account_number')->references('account_number')->on('bank_accounts')->onDelete('set null');
            $table->foreign('target_account_number')->references('account_number')->on('bank_accounts')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
