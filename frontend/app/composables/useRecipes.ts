import type { Recipe } from '~/types/meal'
import type { ApiResponse, PaginatedResponse } from '~/types/api'

export interface RecipeFilters {
  search?: string
  dietary_tags?: string[]
  meal_type?: string
  page?: number
  per_page?: number
}

/**
 * Composable for recipe API operations
 */
export const useRecipes = () => {
  let apiBaseUrl = 'http://localhost:8000'
  try {
    const config = useRuntimeConfig()
    apiBaseUrl = config.public?.apiBaseUrl || 'http://localhost:8000'
  } catch (e) {
    apiBaseUrl = 'http://localhost:8000'
  }

  /**
   * Fetch paginated recipes with optional filters
   */
  const fetchRecipes = async (filters: RecipeFilters = {}): Promise<PaginatedResponse<Recipe>> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<PaginatedResponse<Recipe>>(
      //   `${apiBaseUrl}/api/recipes`,
      //   {
      //     query: filters,
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response

      // Mock data for development
      console.warn('fetchRecipes: Using mock data - API not yet implemented')
      return generateMockRecipes(filters)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw new Error('Failed to fetch recipes')
    }
  }

  /**
   * Fetch a single recipe by ID
   */
  const fetchRecipeById = async (id: number): Promise<Recipe> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<Recipe>>(
      //   `${apiBaseUrl}/api/recipes/${id}`,
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response.data

      // Mock data for development
      console.warn('fetchRecipeById: Using mock data - API not yet implemented')
      const mockRecipes = generateMockRecipes({})
      const recipe = mockRecipes.data.find(r => r.id === id)
      if (!recipe) throw new Error('Recipe not found')
      return recipe
    } catch (error) {
      console.error('Error fetching recipe:', error)
      throw new Error('Failed to fetch recipe')
    }
  }

  return {
    fetchRecipes,
    fetchRecipeById
  }
}

/**
 * Generate mock recipe data for development
 */
function generateMockRecipes(filters: RecipeFilters): PaginatedResponse<Recipe> {
  const allMockRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Avocado Toast',
      description: 'Simple and delicious avocado toast with cherry tomatoes',
      instructions: 'Toast bread, mash avocado, add toppings',
      prep_time: 5,
      cook_time: 5,
      total_time: 10,
      servings: 1,
      difficulty: 'easy',
      meal_type: 'breakfast',
      image_path: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Greek Salad',
      description: 'Fresh Mediterranean salad with feta cheese and olives',
      instructions: 'Chop vegetables, add feta, dress with olive oil',
      prep_time: 10,
      cook_time: 0,
      total_time: 10,
      servings: 2,
      difficulty: 'easy',
      meal_type: 'lunch',
      image_path: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 3,
      title: 'Grilled Chicken Breast',
      description: 'Tender grilled chicken with herbs and spices',
      instructions: 'Season chicken, grill for 6-8 minutes per side',
      prep_time: 10,
      cook_time: 15,
      total_time: 25,
      servings: 4,
      difficulty: 'medium',
      meal_type: 'dinner',
      image_path: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 4,
      title: 'Veggie Stir Fry',
      description: 'Quick and healthy vegetable stir fry with soy sauce',
      instructions: 'Chop vegetables, stir fry in hot wok with sauce',
      prep_time: 15,
      cook_time: 10,
      total_time: 25,
      servings: 2,
      difficulty: 'easy',
      meal_type: 'dinner',
      image_path: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 5,
      title: 'Overnight Oats',
      description: 'No-cook breakfast with oats, milk, and fresh berries',
      instructions: 'Mix oats with milk, refrigerate overnight, add toppings',
      prep_time: 5,
      cook_time: 0,
      total_time: 5,
      servings: 1,
      difficulty: 'easy',
      meal_type: 'breakfast',
      image_path: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 6,
      title: 'Pasta Primavera',
      description: 'Light pasta with seasonal vegetables and garlic',
      instructions: 'Cook pasta, sauté vegetables, toss together',
      prep_time: 15,
      cook_time: 20,
      total_time: 35,
      servings: 4,
      difficulty: 'medium',
      meal_type: 'dinner',
      image_path: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 7,
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade chocolate chip cookies',
      instructions: 'Mix ingredients, scoop dough, bake at 350°F for 12 minutes',
      prep_time: 15,
      cook_time: 12,
      total_time: 27,
      servings: 24,
      difficulty: 'easy',
      meal_type: 'snack',
      image_path: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 8,
      title: 'Quinoa Buddha Bowl',
      description: 'Nutritious bowl with quinoa, roasted veggies, and tahini',
      instructions: 'Cook quinoa, roast vegetables, assemble bowl with dressing',
      prep_time: 10,
      cook_time: 30,
      total_time: 40,
      servings: 2,
      difficulty: 'medium',
      meal_type: 'lunch',
      image_path: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 9,
      title: 'Salmon Teriyaki',
      description: 'Glazed salmon with homemade teriyaki sauce',
      instructions: 'Prepare sauce, brush on salmon, bake at 400°F for 15 minutes',
      prep_time: 10,
      cook_time: 15,
      total_time: 25,
      servings: 2,
      difficulty: 'medium',
      meal_type: 'dinner',
      image_path: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 10,
      title: 'Smoothie Bowl',
      description: 'Thick smoothie topped with fresh fruits and granola',
      instructions: 'Blend frozen fruits with liquid, pour into bowl, add toppings',
      prep_time: 5,
      cook_time: 0,
      total_time: 5,
      servings: 1,
      difficulty: 'easy',
      meal_type: 'breakfast',
      image_path: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z'
    }
  ]

  // Apply filters
  let filteredRecipes = allMockRecipes

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredRecipes = filteredRecipes.filter(
      recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower)
    )
  }

  if (filters.meal_type) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.meal_type === filters.meal_type)
  }

  // Pagination
  const page = filters.page || 1
  const perPage = filters.per_page || 10
  const start = (page - 1) * perPage
  const end = start + perPage
  const paginatedRecipes = filteredRecipes.slice(start, end)

  return {
    data: paginatedRecipes,
    meta: {
      current_page: page,
      from: start + 1,
      last_page: Math.ceil(filteredRecipes.length / perPage),
      path: '/api/recipes',
      per_page: perPage,
      to: Math.min(end, filteredRecipes.length),
      total: filteredRecipes.length
    },
    links: {
      first: '/api/recipes?page=1',
      last: `/api/recipes?page=${Math.ceil(filteredRecipes.length / perPage)}`,
      prev: page > 1 ? `/api/recipes?page=${page - 1}` : null,
      next: page < Math.ceil(filteredRecipes.length / perPage) ? `/api/recipes?page=${page + 1}` : null
    }
  }
}
