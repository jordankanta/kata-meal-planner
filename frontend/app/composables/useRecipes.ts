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
      const response = await $fetch<PaginatedResponse<Recipe>>(
        `${apiBaseUrl}/api/recipes`,
        {
          query: filters,
          headers: {
            'Accept': 'application/json',
          }
        }
      )
      return response
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
      const response = await $fetch<ApiResponse<Recipe>>(
        `${apiBaseUrl}/api/recipes/${id}`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      )
      return response.data
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
