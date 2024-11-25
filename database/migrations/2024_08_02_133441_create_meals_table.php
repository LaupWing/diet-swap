<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('picture_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->string('is_healthy');
            $table->string('is_healthy_reason');
            $table->string('calories');
            $table->string('protein');
            $table->string('carbs');
            $table->string('fats');
            $table->string('sugar');
            $table->string('fiber');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meals');
    }
};
