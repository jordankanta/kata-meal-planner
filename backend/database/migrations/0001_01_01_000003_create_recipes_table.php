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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->text('instructions');
            $table->integer('prep_time');
            $table->integer('cook_time');
            $table->integer('total_time');
            $table->integer('servings');
            $table->enum('difficulty', ['easy', 'medium', 'hard']);
            $table->enum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack', 'dessert']);
            $table->string('image_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('meal_type');
            $table->index('difficulty');
            $table->index('is_active');
            $table->fullText(['title', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
