<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstudianteRequest;
use App\Models\Estudiante;
use App\Models\Recibo;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Estudiante::with(['recibos']);
        
        return $this->generateViewSetList(
            $request,
            $query,
            [],
            ['dni', 'nombre'],
            ['id', 'nombre']
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EstudianteRequest $request)
    {
        $estudiante = Estudiante::create($request->all());
        return response()->json([
            'estudiante' => $estudiante,
            'message' => 'Estudiante creado con éxito'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estudiante $estudiante)
    {
        // Buscar al estudiante y encontrar coincidencias con Certificado de Estudios
        $crt = Recibo::where('estudiante_id', $estudiante->id)
                ->whereHas('items', function ($query) {
                    $query->whereRaw('LOWER(concepto) LIKE ?', ['%certificado de estudios%']);
                })
                ->exists();

        if ($estudiante) {
            return response()->json([
                'estudiante' => $estudiante,
                'certificado' => $crt,
                'message' => 'Estudiante encontrado'
            ], 200);
        } else {
            return response()->json([
                'error' => 'El Estudiante no fue encontrado'
            ], 404);
        }
    }

    public function show_dni($dni)
    {
        // Buscar al estudiante y encontrar coincidencias con Certificado de Estudios
        $est = Estudiante::where('dni', $dni)->first();
        $crt = Recibo::where('estudiante_id', $est->id)
                ->whereHas('items', function ($query) {
                    $query->whereRaw('LOWER(concepto) LIKE ?', ['%certificado de estudios%']);
                })
                ->exists();
        
        if ($est) {
            return response()->json([
                'estudiante' => $est,
                'certificado' => $crt,
                'message' => 'Estudiante encontrado'
            ], 200);
        } else {
            return response()->json([
                'error' => 'El Estudiante no fue encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EstudianteRequest $request, Estudiante $estudiante)
    {
        $estudiante->update($request->all());
        return response()->json([
            'estudiante' => $estudiante,
            'message' => 'El Estudiante fue actualizado'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estudiante $estudiante)
    {
        $estudiante->delete();
        return response()->json([
            'message' => 'Estudiante eliminado'
        ], 201);
    }
}
