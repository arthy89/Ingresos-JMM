<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReciboRequest;
use App\Models\Estudiante;
use App\Models\Recibo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReciboController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Recibo::with(['estudiante']);

        return $this->newGenerateViewSetList(
            $request,
            $query,
            ['fecha'],
            [
                'num',
                'senor',
                'estudiante.dni',
                'estudiante.nombre'
            ],
            ['id', 'num']
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReciboRequest $request)
    {
        DB::beginTransaction();

        try {
            if (!$request->estudiante_id) {
                $estudiante = Estudiante::create($request->estudiante);
                $request->merge(['estudiante_id' => $estudiante->id]);
            }

            $recibo = Recibo::create($request->all());

            if ($request->items) {
                $recibo->items()->createMany($request->items);
            }

            DB::commit();

            return response()->json([
                'recibo' => $recibo,
                'message' => 'Recibo creado con éxito'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Error al crear el Recibo',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Recibo $recibo)
    {
        if ($recibo) {
            $recibo->load(['estudiante']);
            
            return response()->json([
                'recibo' => $recibo,
                'message' => 'Recibo encontrado'
            ], 200);
        } else {
            return response()->json([
                'error' => 'El Recibo no fue encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReciboRequest $request, Recibo $recibo)
    {
        DB::beginTransaction();

        try {
            if (!$request->estudiante_id) {
                $estudiante = Estudiante::create($request->estudiante);
                $request->merge(['estudiante_id' => $estudiante->id]);
            }

            $recibo->update($request->all());

            if ($request->items) {
                $recibo->items()->delete();
                $recibo->items()->createMany($request->items);
            }

            DB::commit();

            return response()->json([
                'recibo' => $recibo,
                'message' => 'El Recibo fue actualizado'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Error al actualizar el Recibo',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recibo $recibo)
    {
        $recibo->delete();
        return response()->json([
            'message' => 'Recibo eliminado'
        ], 201);
    }
}
