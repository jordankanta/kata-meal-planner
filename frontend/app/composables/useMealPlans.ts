import type {
  DailyDigestResponse,
  MealPlan,
  AlternativeRecipe,
  SwapMealRequest,
  Recipe
} from '~/types/meal'
import type { ApiResponse } from '~/types/api'

/**
 * Composable for meal plan API operations
 */
export const useMealPlans = () => {
  // Use try-catch to handle SSR context issues
  let apiBaseUrl = 'http://localhost:8000'
  try {
    const config = useRuntimeConfig()
    apiBaseUrl = config.public?.apiBaseUrl || 'http://localhost:8000'
  } catch (e) {
    // In case useRuntimeConfig fails outside Nuxt context
    apiBaseUrl = 'http://localhost:8000'
  }

  /**
   * Fetch today's daily digest
   */
  const fetchDailyDigest = async (): Promise<DailyDigestResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<DailyDigestResponse>>(
      //   `${apiBaseUrl}/api/meal-plans/daily-digest`,
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //       // Add auth token when implemented
      //     }
      //   }
      // )
      // return response.data

      // Mock data for development
      console.warn('fetchDailyDigest: Using mock data - API not yet implemented')
      return {
        date: new Date().toISOString().split('T')[0],
        meals: []
      }
    } catch (error) {
      console.error('Error fetching daily digest:', error)
      throw new Error('Failed to fetch daily digest')
    }
  }

  /**
   * Fetch user's meal plans (weekly view)
   */
  const fetchWeeklyPlan = async (): Promise<MealPlan | null> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<MealPlan[]>>(
      //   `${apiBaseUrl}/api/meal-plans`,
      //   {
      //     query: { is_active: true },
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response.data[0] || null

      // Mock data for development
      console.warn('fetchWeeklyPlan: Using mock data - API not yet implemented')
      return null
    } catch (error) {
      console.error('Error fetching weekly plan:', error)
      throw new Error('Failed to fetch weekly meal plan')
    }
  }

  /**
   * Get alternative recipe suggestions for swapping
   */
  const getAlternatives = async (mealPlanRecipeId: number): Promise<AlternativeRecipe[]> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<AlternativeRecipe[]>>(
      //   `${apiBaseUrl}/api/meal-plan-recipes/${mealPlanRecipeId}/alternatives`,
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response.data

      // Mock data for development
      console.warn('getAlternatives: Using mock data - API not yet implemented')
      return []
    } catch (error) {
      console.error('Error fetching alternatives:', error)
      throw new Error('Failed to fetch alternative recipes')
    }
  }

  /**
   * Execute a meal swap
   */
  const executeMealSwap = async (
    mealPlanRecipeId: number,
    newRecipeId: number
  ): Promise<void> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const body: SwapMealRequest = { new_recipe_id: newRecipeId }
      // await $fetch(
      //   `${apiBaseUrl}/api/meal-plan-recipes/${mealPlanRecipeId}/swap`,
      //   {
      //     method: 'PUT',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body
      //   }
      // )

      // Mock implementation for development
      console.warn('executeMealSwap: Using mock implementation - API not yet implemented')
      console.log(`Swapping meal ${mealPlanRecipeId} with recipe ${newRecipeId}`)
    } catch (error) {
      console.error('Error swapping meal:', error)
      throw new Error('Failed to swap meal')
    }
  }

  /**
   * Fetch recipe details by ID
   */
  const fetchRecipeDetails = async (recipeId: number): Promise<Recipe> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<Recipe>>(
      //   `${apiBaseUrl}/api/recipes/${recipeId}`,
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response.data

      // Mock data for development
      console.warn('fetchRecipeDetails: Using mock data - API not yet implemented')
      throw new Error('Recipe not found')
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      throw new Error('Failed to fetch recipe details')
    }
  }

  return {
    fetchDailyDigest,
    fetchWeeklyPlan,
    getAlternatives,
    executeMealSwap,
    fetchRecipeDetails
  }
}
