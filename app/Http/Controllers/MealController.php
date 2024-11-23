<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeMealRequest;
use Illuminate\Http\Request;
use OpenAI;

class MealController extends Controller
{
    public function analyze(AnalyzeMealRequest $request)
    {
        $data = $request->validated();
        logger($data);

        $picture = $data["picture"];
        $name = $data["name"];
        $description = $data["description"];

        $base64Image = base64_encode(file_get_contents($picture->getRealPath()));

        $open_ai = OpenAI::client(env("OPENAI_API_KEY"));

        $response = $open_ai->chat()->create([
            "model" => "gpt-4o-mini",
            "response_format" => [
                "type" => "json_object",
            ],
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant designed to analyze the image for the nutritional values. The output should be a JSON object with the following keys: 'calories', 'protein', 'carb', 'fiber', 'fats'.
                    
                    'protein' - The amount of protein in grams.

                    'carb' - The amount of carbs in grams.

                    'calories' - The amount of calories.

                    'fiber' - The amount of fiber it has.

                    'fats' - The amount of fats it has.
                    "
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => "Analyze this meal:\nName: {$name}\nDescription: {$description}",
                        ],
                        [
                            'type' => 'image_url',
                            'image_url' => [
                                'url' => "data:image/jpeg;base64,{$base64Image}",
                            ],
                        ],
                    ],
                ],
            ],
            "max_tokens" => 4000,
        ]);

        $data = json_decode($response->choices[0]->message->content);

        logger(print_r($data, true));
        back();
    }
}
