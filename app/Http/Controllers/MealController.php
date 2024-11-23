<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeMealRequest;
use Illuminate\Http\Request;

class MealController extends Controller
{
    public function analyze(AnalyzeMealRequest $request)
    {
        $data = $request->validated();

        $picture = $data["picture"];
        $name = $data["name"];
        $description = $data["description"];

        $base64Image = base64_encode(file_get_contents($picture->getRealPath()));
    }
}
