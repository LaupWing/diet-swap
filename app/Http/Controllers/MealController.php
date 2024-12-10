<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeMealRequest;
use App\Models\Meal;
use Carbon\Carbon;
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

        if ($user->credits->amount <= 0) {
            return response()->json([
                'message' => 'You do not have enough credits to analyze this meal.'
            ], 402);
        }

        $picture = $data["picture"];
        $name = $data["name"];
        $description = $data["description"];
        $type = $data["type"];

        $pictureRecord = $user->pictures()->create([
            'file_extension' => $picture->extension(),
            'name' => $name,
            'type' => $type,
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
                    
                    'protein' - The total amount of protein in grams (Quantity of the item may be included in the description).

                    'carb' - The total amount of carbs in grams (Quantity of the item may be included in the description).

                    'calories' - The total amount of calories (Quantity of the item may be included in the description).

                    'fiber' - The total amount of fiber it has (Quantity of the item may be included in the description).

                    'fats' - The total amount of fats it has (Quantity of the item may be included in the description).

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

    public function getMeals()
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $timezone = $user->userInfo->timezone;

        $startOfDay = Carbon::now($timezone)->startOfDay()->setTimezone('UTC');
        $endOfDay = Carbon::now($timezone)->endOfDay()->setTimezone('UTC');

        $pictures = $user->pictures()
            ->with('meal')
            ->whereBetween('created_at', [$startOfDay, $endOfDay])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($pictures);
    }

    public function swapMeal(Meal $meal)
    {
        $open_ai = OpenAI::client(env("OPENAI_API_KEY"));
        $name = $meal->name;
        $description = $meal->description;
        $calories = $meal->calories;
        $protein = $meal->protein;
        $carbs = $meal->carbs;
        $fats = $meal->fats;
        $fiber = $meal->fiber;
        logger($meal);
        $response = $open_ai->chat()->create([
            "model" => "gpt-4o-mini",
            "response_format" => [
                "type" => "json_object",
            ],
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant designed to find an alternative healthier food option. The output should be an JSON object with the property 'alternatives'. 'alternatives' is an Array with 5 objects with the following keys: 'name', 'descriptoin', 'calories', 'protein', 'carb', 'fiber', 'fats', 'calorie_difference', 'why'.

                    'name' - The name of the meal.

                    'description' - The description of the meal.
                    
                    'protein' - The total amount of protein in grams (Quantity of the item may be included in the description).

                    'carb' - The total amount of carbs in grams (Quantity of the item may be included in the description).

                    'calories' - The total amount of calories (Quantity of the item may be included in the description).

                    'fiber' - The total amount of fiber it has (Quantity of the item may be included in the description).

                    'fats' - The total amount of fats it has (Quantity of the item may be included in the description).

                    'calorie_difference' - The difference in calories between the original meal.

                    'why' - A string explaining why this meal is a healthier option.
                    "
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => "The meal I want to have healthier options is:\nName: {$name}\nDescription: {$description}\nNutrients: Calories: {$calories}, Protein: {$protein}, Carbs: {$carbs}, Fats: {$fats}, Fiber: {$fiber}",
                        ],

                    ],
                ],
            ],
            "max_tokens" => 4000,
        ]);

        $data = json_decode($response->choices[0]->message->content);
        logger(print_r($data, true));
        return response()->json($data);
    }
}
