<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'recibo_id',
        'concepto_id',
        'cantidad',
        'importe',
    ];

    protected $with = ['concepto'];

    public function concepto()
    {
        return $this->belongsTo(Concepto::class);
    }
}
