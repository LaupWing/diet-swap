<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnalyzeMealRequest extends FormRequest
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
            'picture' => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:20480'],
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'type' => ['required', 'string'],
        ];
    }
}
