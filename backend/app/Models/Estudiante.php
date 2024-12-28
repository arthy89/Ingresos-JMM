<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = ['dni', 'nombre'];
    // protected $with = ['recibos'];

    public function recibos()
    {
        return $this->hasMany(Recibo::class);
    }
}
