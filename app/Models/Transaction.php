<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $PrimaryKey = 'transaction_id';
    public $timestamps = false;
    protected $fillable = [
        'source_account_number',
        'target_account_number',
        'transaction_amount',
        'timestamp', 
    ];
    public function sourceAccount()
    {
        return $this->belongsTo(BankAccount::class, 'source_account_number', 'account_number');
    }
    public function targetAccount()
    {
        return $this->belongsTo(BankAccount::class, 'target_account_number', 'account_number');
    }
    public function p2pOrder()
    {
        return $this->hasOne(P2pOrder::class, 'transaction_id', 'transaction_id');
    }
}
