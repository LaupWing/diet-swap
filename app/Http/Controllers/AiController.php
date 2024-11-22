<?php

namespace App\Http\Controllers;

use App\Http\Requests\AiRequest;
use Illuminate\Http\Request;
use OpenAI;

class AiController extends Controller
{
    public function generate(AiRequest $request)
    {
        $data = $request->validated();

        $age = $data["age"];
        $gender = $data["gender"];
        $height = $data["height"];
        $weight = $data["weight"];
        $activity_level = $data["activity_level"];
        $goal_weight = $data["goal_weight"];
        $goal_months = $data["goal_months"];
        $unit = $data["unit"];

        $activity_levels = [
            "sedentary" => "Sedentary (office job)",
            "light-exercise" => "Light Exercise (1-2 days/week)",
            "moderate-exercise" => "Moderate Exercise (3-5 days/week)",
            "heavy-exercise" => "Heavy Exercise (6-7 days/week)",
            "athlete" => "Athlete (2x per day)",
        ];

        $activity_level = $activity_levels[$activity_level];

        $open_ai = OpenAI::client(env("OPENAI_API_KEY"));

        $response = $open_ai->chat()->create([
            "model" => "gpt-3.5-turbo-1106",
            "response_format" => [
                "type" => "json_object",
            ],
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant designed to help users to achieve their bodyweight goal by providing them with a personalized diet plan. The output should be a JSON object with the following keys: 'protein', 'bodyfat', 'calories', 'meal_plan'.
                    
                    'protein' - The amount of protein in grams that the user should consume daily.

                    'current_bodyfat' - The exact current bodyfat percentage the user has as a number.

                    'goal_bodyfat' - The exact bodyfat percentage the user aim for as a number.

                    'calories' - The amount of calories that the user should consume daily.

                    'meal_plan' - A list of meals that the user should consume daily. Each meal should have a 'recipe_name'(name of the recipe),'calories', and 'meal_type'(breakfast, lunch, diner, or snack) key.
                    
                    "
                ],
                [
                    "role" => "user",
                    "content" => "I'm a $gender and $age years old. I'm $height cm tall and weigh $weight $unit. I'm $activity and I want to reach $goal_weight $unit in $goal_months months."
                ]
            ],
            "max_tokens" => 4000,
        ]);

        $data = json_decode($response->choices[0]->message->content);
        return back();
    }
}
