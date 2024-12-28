<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    use HasFactory;

    protected $fillable = [
        'estudiante_id',
        'num',
        'senor',
        'total',
        'comentarios',
    ];

    protected $with = ['items'];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
