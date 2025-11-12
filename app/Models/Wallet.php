<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Property;

class Wallet extends Model
{
    use HasFactory;
    protected $primaryKey = 'wallet_id';
    protected $fillable = [
        'user_id',
        'type',
        'balance',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function properties()
    {
        return $this->hasMany(Property::class, 'wallet_id', 'wallet_id');
    }
}
