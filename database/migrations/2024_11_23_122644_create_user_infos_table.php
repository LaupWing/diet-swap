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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('weight');
            $table->string('height');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('ideal_weight');
            $table->string('ideal_weight_timespan_in_months');
            $table->string('weight_unit');
            $table->string('height_unit');
            $table->string('activity_level');
            $table->string('allergies')->nullable();
            $table->string('cuisine')->nullable();
            $table->string('dietary')->nullable();
            $table->text('special_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
