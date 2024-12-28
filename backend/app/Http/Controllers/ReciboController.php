<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReciboRequest;
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

        return $this->generateViewSetList(
            $request,
            $query,
            [],
            [
                'num',
                'senor',
                'estudiante.dni',
                'estudiante.nombre'
            ],
            [],
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
            // $recibo_r = $request->all();
            $ultimo_recibo = Recibo::latest()->first();

            if ($ultimo_recibo) {
                $request['num'] = $ultimo_recibo->num + 1;
            } else {
                $request['num'] = 1;
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
