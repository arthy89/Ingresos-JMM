<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EstudianteRequest extends FormRequest
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
        // Obtiene el id de la ruta y se ignora al actualizar
        
        $estudianteId = $this->route('estudiante')?->id;

        return [
            'dni' => [
                'required',
                'digits:8',
                Rule::unique('estudiantes', 'dni')->ignore($estudianteId),
            ],
            'nombre' => 'required',
        ];
    }
}
