<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RecipeController extends Controller
{
    /**
     * Display a listing of recipes with optional filtering and pagination
     */
    public function index(Request $request): JsonResponse
    {
        $query = Recipe::active();

        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $query->search($request->search);
        }

        // Apply meal type filter
        if ($request->has('meal_type') && !empty($request->meal_type)) {
            $query->byMealType($request->meal_type);
        }

        // Apply difficulty filter
        if ($request->has('difficulty') && !empty($request->difficulty)) {
            $query->byDifficulty($request->difficulty);
        }

        // Apply dietary tags filter (if needed in future)
        if ($request->has('dietary_tags') && is_array($request->dietary_tags)) {
            // TODO: Implement when recipe_dietary_restrictions table is ready
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $recipes = $query->paginate($perPage);

        return response()->json([
            'data' => $recipes->items(),
            'meta' => [
                'current_page' => $recipes->currentPage(),
                'from' => $recipes->firstItem(),
                'last_page' => $recipes->lastPage(),
                'path' => $recipes->path(),
                'per_page' => $recipes->perPage(),
                'to' => $recipes->lastItem(),
                'total' => $recipes->total(),
            ],
            'links' => [
                'first' => $recipes->url(1),
                'last' => $recipes->url($recipes->lastPage()),
                'prev' => $recipes->previousPageUrl(),
                'next' => $recipes->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Display the specified recipe
     */
    public function show(int $id): JsonResponse
    {
        $recipe = Recipe::active()->find($id);

        if (!$recipe) {
            return response()->json([
                'message' => 'Recipe not found',
            ], 404);
        }

        return response()->json([
            'data' => $recipe,
        ]);
    }
}
