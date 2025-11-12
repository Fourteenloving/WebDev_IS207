<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;
    protected $primaryKey = 'account_number';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'account_number',
        'bank_name',
        'user_id',
        'account_balance',
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id', 'id');
    }
}
