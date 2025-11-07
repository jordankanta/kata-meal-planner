<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'instructions',
        'prep_time',
        'cook_time',
        'total_time',
        'servings',
        'difficulty',
        'meal_type',
        'image_path',
        'is_active',
    ];

    protected $casts = [
        'prep_time' => 'integer',
        'cook_time' => 'integer',
        'total_time' => 'integer',
        'servings' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Scope to filter active recipes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by meal type
     */
    public function scopeByMealType($query, $mealType)
    {
        return $query->where('meal_type', $mealType);
    }

    /**
     * Scope to filter by difficulty
     */
    public function scopeByDifficulty($query, $difficulty)
    {
        return $query->where('difficulty', $difficulty);
    }

    /**
     * Scope to search recipes by title or description
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }
}
