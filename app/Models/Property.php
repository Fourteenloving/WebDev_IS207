<?php

namespace App\Models;

use Hamcrest\Arrays\IsArray;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey =['symbol', 'wallet_id'];
    protected $fillable = [
        'symbol',
        'wallet_id',
        'average_buy_price',
        'unit_number',
    ];
    public function wallet(){
        return $this->belongsTo(Wallet::class,'wallet_id','wallet_id');
    }
    protected function setKeysForSaveQuery($query){
        $keys = $this->getKeyName();
        if (!is_array($keys)){
            return parent::setKeysForSaveQuery($query);
        }
        foreach($keys as $key){
            $query->where($key, '=',$this->getAttribute($key) );
        }
        return $query;

    }
    public function getKey()
{
    $attributes = [];

    /** @var array $keys */ 
    $keys = $this->getKeyName();

    foreach ($keys as $key) {
        $attributes[$key] = $this->getAttribute($key);
    }
    return $attributes;
}
}
