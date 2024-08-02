<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use OpenAI;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "test:command";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "This is a test command";

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $open_ai = OpenAI::client(env("OPENAI_API_KEY"));
        $content =  "";
        $response = $open_ai->chat()->create([
            "model" => "gpt-4o-mini",
            "response_format" => [
                "type" => "json_object",
            ],
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant designed to analyze a meal and output in JSON format.
                    You return an object with the following properties: name, protein, calories, fats, fiber, carbohydrates.
                    "
                ],
                [
                    "role" => "user",
                    "content" => [
                        [
                            "type" => "text",
                            "text" => "Give me the info for this meal. Here is a short description of the meal: carpaccio salad with garlic sauce"
                        ],
                        [
                            "type" => "image_url",
                            "image_url" => [
                                "url" => "https://i.imghippo.com/files/6CX4m1722608547.jpg"
                            ]
                        ]
                    ]
                ]
            ],
            "max_tokens" => 4000,
        ]);

        logger($response->choices[0]->message->content);
    }
}
