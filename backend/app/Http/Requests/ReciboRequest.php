<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReciboRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'estudiante_id' => 'nullable',
            // 'num' => 'nullable',
            'fecha' => 'required',
            'senor' => 'required',
            'total' => 'required',
            'comentarios' => 'nullable',

            // Items
            'items' => 'array|nullable',
            'items.*.concepto' => 'required',
            'items.*.cantidad' => 'required|integer',
            'items.*.precio' => 'required',
            'items.*.importe' => 'required',

            // Estudiante
            'estudiante' => 'array|required',
            'estudiante.dni' => 'required|max:8',
            'estudiante.nombre' => 'required',
        ];
    }
}
