<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConceptoRequest;
use App\Models\Concepto;
use Illuminate\Http\Request;

class ConceptoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conceptos = Concepto::all();
        return $conceptos;
    }

    public function index_all(Request $request)
    {
        return $this->generateViewSetList(
            $request,
            Concepto::query(),
            [],
            ['nombre'],
            ['id']
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ConceptoRequest $request)
    {
        $concepto = Concepto::create($request->all(), 201);
        return response()->json([
            'concepto' => $concepto,
            'message' => 'Concepto creado con éxito'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Concepto $concepto)
    {
        if ($concepto) {
            return response()->json([
                'concepto' => $concepto,
                'message' => 'Concepto encontrado'
            ], 200);
        } else {
            return response()->json([
                'error' => 'El Concepto no fue encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ConceptoRequest $request, Concepto $concepto)
    {
        $concepto->update($request->all());
        return response()->json([
            'concepto' => $concepto,
            'message' => 'El Concepto fue actualizado'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Concepto $concepto)
    {
        $concepto->delete();
        return response()->json([
            'message' => 'Concepto eliminado'
        ], 201);
    }
}
