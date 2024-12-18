<?php

namespace App\Http\Controllers;

use App\Http\Requests\AiRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use OpenAI;

class AiController extends Controller
{
    public function generate(AiRequest $request)
    {
        $data = $request->validated();

        $email = $data["email"];
        $password = $data["password"];
        $firstname = $data["firstname"];
        $lastname = $data["lastname"];
        $dateOfBirth = $data["dateOfBirth"];
        $gender = $data["gender"];
        $height = $data["height"];
        $weight = $data["weight"];
        $activity_level = $data["activity_level"];
        $goal_weight = $data["ideal_weight"];
        $goal_months = $data["ideal_weight_timespan_in_months"];
        $weight_unit = $data["weight_unit"];
        $height_unit = $data["height_unit"];
        $allergies = $data["allergies"];
        $cuisine = $data["cuisine"];
        $dietary = $data["dietary"];
        $special_notes = $data["special_notes"];
        $timezone = $data["timezone"];

        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $user->userInfo()->create([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'weight' => $weight,
            'height' => $height,
            'gender' => $gender,
            'date_of_birth' => $dateOfBirth,
            'ideal_weight' => $goal_weight,
            'ideal_weight_timespan_in_months' => $goal_months,
            'weight_unit' => $weight_unit,
            'height_unit' => $height_unit,
            'activity_level' => $activity_level,
            'allergies' => $allergies,
            'cuisine' => $cuisine,
            'dietary' => $dietary,
            'special_notes' => $special_notes,
            'timezone' => $timezone,
        ]);
        $user->credits()->create();

        Auth::login($user);

        $activity_levels = [
            "sedentary" => "Sedentary (office job)",
            "light-exercise" => "Light Exercise (1-2 days/week)",
            "moderate-exercise" => "Moderate Exercise (3-5 days/week)",
            "heavy-exercise" => "Heavy Exercise (6-7 days/week)",
            "athlete" => "Athlete (2x per day)",
        ];

        $activity_level = $activity_levels[$activity_level];

        $open_ai = OpenAI::client(env("OPENAI_API_KEY"));

        $age = date_diff(date_create($dateOfBirth), date_create("now"))->y;

        $content = "I'm a $gender and $age years old. I'm $height $height_unit tall and weigh $weight $weight_unit. I'm $activity_level and I want to reach $goal_weight $weight_unit in $goal_months months.";

        if ($allergies) {
            $content .= " I have $allergies.";
        }
        if ($cuisine) {
            $content .= " I prefer $cuisine cuisine.";
        }
        if ($dietary) {
            $content .= " I'm on a $dietary diet.";
        }
        if ($special_notes) {
            $content .= " $special_notes.";
        }
        while (true) {

            $response = $open_ai->chat()->create([
                "model" => "gpt-3.5-turbo-1106",
                "response_format" => [
                    "type" => "json_object",
                ],
                "messages" => [
                    [
                        "role" => "system",
                        "content" => "You are a helpful assistant designed to help users to achieve their bodyweight goal by providing them with a personalized diet plan. The output should be a JSON object with the following keys: 'protein', 'bodyfat', 'current_bodyfat', 'calories', 'meal_plan'.
                        
                        'protein' - The amount of protein in grams that the user should consume daily.
    
                        'current_bodyfat' - The exact current bodyfat percentage the user has as a number.
    
                        'goal_bodyfat' - The exact bodyfat percentage the user aim for as a number.
    
                        'calories' - The amount of calories that the user should consume daily.
    
                        'meal_plan' - A short description of what fo meals the user can expect as a meal plan.
                        "
                    ],
                    [
                        "role" => "user",
                        "content" => $content
                    ]
                ],
                "max_tokens" => 4000,
            ]);

            $data = json_decode($response->choices[0]->message->content);

            if (
                isset($data->calories)
                && isset($data->protein)
                && isset($data->current_bodyfat)
                && isset($data->goal_bodyfat)
                && isset($data->meal_plan)
            ) {
                break;
            }
        }

        $user->userGoal()->create([
            'calories' => $data->calories,
            'protein' => $data->protein,
            'current_bodyfat' => $data->current_bodyfat,
            'goal_bodyfat' => $data->goal_bodyfat,
            'meal_plan' => $data->meal_plan,
        ]);

        return redirect('/')->with("data", $data);
    }
}
