<?php

namespace App\Http\Controllers;

use App\Models\Concepto;
use App\Models\Recibo;
use Illuminate\Http\Request;

class EstadisticasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return $request;

        $query = Recibo::query();

        // Divide el parámetro mes_ano en año y mes
        [$year] = explode('-', $request->fecha);

        if ($request->filled('mes_ano')) {
            [$year_m, $month_m] = explode('-', $request->mes_ano);
        }

        $sum_total = 0;
        $recuento_anual = [];
        $recuento_conceptos = [];

        // Determinar el año a usar
        // $ano = $request->filled('ano') ? $request->ano : now()->year;
        $ano = $request->filled('ano') ? $request->ano : ($request->filled('fecha') ? $year : ($request->filled('mes_ano') ? $year_m : now()->year));

        // Filtro por fecha exacta
        if ($request->filled('fecha')) {
            $query->where('fecha', $request->fecha);
        }

        // Filtro por año
        $query->whereYear('fecha', $ano);

        // Filtro por mes y año (mes_ano)
        if ($request->filled('mes_ano')) {
            // Divide el parámetro mes_ano en año y mes
            $query->whereYear('fecha', $year_m)->whereMonth('fecha', $month_m);
        }

        // Filtro por concepto
        if ($request->filled('concepto')) {
            $query->whereHas('items', function ($q) use ($request) {
                $q->where('concepto', 'LIKE', "%{$request->concepto}%");
            });
        }

        // Obtener los recibos filtrados
        $recibos = $query->with('items')->get();

        // Sumar el total de los recibos filtrados
        foreach ($recibos as $recibo) {
            $sum_total += $recibo->total;
        }

        // Recuento anual por mes
        $totales_por_mes = Recibo::whereYear('fecha', $ano)
            ->selectRaw('MONTH(fecha) as mes, SUM(total) as total')
            ->groupBy('mes')
            ->pluck('total', 'mes');

        // Inicializar el recuento con todos los meses en 0
        $meses = [
            1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
            5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
            9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre',
        ];

        foreach ($meses as $numero => $nombre) {
            $recuento_anual[] = [
                'mes' => $nombre,
                'total' => number_format($totales_por_mes->get($numero, 0), 2), // Formatear el total con 2 decimales
            ];
        }

        // Consolidar y sumar conceptos desde los items
        $items = $recibos->flatMap->items; // Obtiene todos los items de los recibos filtrados
        $recuento_conceptos = $items
            ->groupBy('concepto') // Agrupa por nombre del concepto
            ->map(function ($group) {
                return [
                    'total' => $group->sum('importe'), // Suma el importe total de cada grupo
                    'cantidad' => $group->count(), // Cuenta la cantidad de elementos en el grupo
                ];
            })
            ->map(function ($data, $concepto) {
                return [
                    'concepto_nombre' => $concepto,
                    'cantidad' => $data['cantidad'], // Agrega el conteo de repeticiones
                    'total' => $data['total'],
                ];
            })
            ->values(); // Reorganiza en un array de valores simples

        // Respuesta en JSON
        return response()->json([
            'fecha' => $request->fecha,
            'ano' => $ano,
            'mes' => $month_m ?? null,
            'sum_total' => $sum_total,
            'recuento_anual' => $recuento_anual,
            'recuento_conceptos' => $recuento_conceptos,
        ]);

        return $recibos;
    }
}
