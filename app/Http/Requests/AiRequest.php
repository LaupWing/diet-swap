<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AiRequest extends FormRequest
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
            "email" => ["required", "string", "email"],
            "password" => ["required", "string"],
            "firstname" => ["required", "string"],
            "lastname" => ["required", "string"],
            "dateOfBirth" => ["required", "date"],
            "gender" => ["required", "string"],
            "weight" => ["required", "integer"],
            "weight_unit" => ["required", "string"],
            "height" => ["required", "integer"],
            "height_unit" => ["required", "string"],
            "ideal_weight" => ["required", "integer"],
            "ideal_weight_timespan_in_months" => ["required", "integer"],
            "dietary" => ["nullable", "string"],
            "cuisine" => ["nullable", "string"],
            "allergies" => ["nullable", "string"],
            "special_notes" => ["nullable", "string"],
            "activity_level" => ["required", "string"],
        ];
    }
}
