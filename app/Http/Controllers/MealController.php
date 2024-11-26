<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeMealRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use OpenAI;

class MealController extends Controller
{
    public function analyze(AnalyzeMealRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        $picture = $data["picture"];
        $name = $data["name"];
        $description = $data["description"];

        $pictureRecord = $user->pictures()->create([
            'file_extension' => $picture->extension(),
            'name' => $name,
            'description' => $description,
        ]);

        Storage::disk('pictures')->put($pictureRecord->file_path, file_get_contents($picture));

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
                    "content" => "You are a helpful assistant designed to analyze the image for the nutritional values. The output should be a JSON object with the following keys: 'name', 'descriptoin', 'calories', 'protein', 'carb', 'fiber', 'fats', 'healthy'.

                    'name' - The name of the meal.

                    'description' - The description of the meal.
                    
                    'protein' - The amount of protein in grams.

                    'carb' - The amount of carbs in grams.

                    'calories' - The amount of calories.

                    'fiber' - The amount of fiber it has.

                    'fats' - The amount of fats it has.

                    'healthy' - An object with the following keys: 'is_healthy' - an enum value which can be healthy, unhealthy or neutral, 'reason' - a string explaining why it is healthy or not.
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

        $pictureRecord->meal()->create([
            'name' => $data->name,
            'description' => $data->description,
            'calories' => $data->calories,
            'protein' => $data->protein,
            'carbs' => $data->carb,
            'fats' => $data->fats,
            'sugar' => 0,
            'fiber' => $data->fiber,
            'is_healthy' => $data->healthy->is_healthy,
            'is_healthy_reason' => $data->healthy->reason,
        ]);

        return response()->json([
            'meal' => $pictureRecord->meal
        ]);
    }
}
