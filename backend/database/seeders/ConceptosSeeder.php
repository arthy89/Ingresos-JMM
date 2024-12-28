<?php

namespace Database\Seeders;

use App\Models\Concepto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConceptosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conceptos = array(
            array('nombre' => 'Expedición de Certificado de Estudios', 'precio' => 10.00),
            array('nombre' => 'Evaluación de Recuperación', 'precio' => 15.00),
            array('nombre' => 'Evaluación de Subsanación', 'precio' => 20.00),
            array('nombre' => 'Acreditación de traslado de Matrícula', 'precio' => 25.00),
            array('nombre' => 'Exoneración de Cursos', 'precio' => 30.00),
            array('nombre' => 'Rectificación de Nombres y Apellidos', 'precio' => 10.00),
            array('nombre' => 'Alquiler', 'precio' => 5.00),
            array('nombre' => 'Tarjeta de Notas', 'precio' => 5.00),
            array('nombre' => 'Constancias', 'precio' => 12.00),
            array('nombre' => 'FUT', 'precio' => 0.50),
            array('nombre' => 'Otros', 'precio' => 0.00),
        );

        DB::table((new Concepto())->getTable())->insert($conceptos);
    }
}
