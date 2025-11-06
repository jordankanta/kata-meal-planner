import { defineStore } from 'pinia'
import type { MealPlan, MealPlanRecipe, DailyMeal } from '~/types/meal'

interface MealPlanState {
  currentMealPlan: MealPlan | null
  dailyMeals: DailyMeal[]
  selectedDate: string
  loading: boolean
  error: string | null
}

export const useMealPlanStore = defineStore('mealPlan', {
  state: (): MealPlanState => ({
    currentMealPlan: null,
    dailyMeals: [],
    selectedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    loading: false,
    error: null
  }),

  getters: {
    /**
     * Get meals for a specific date
     */
    mealsForDate: (state) => (date: string): DailyMeal[] => {
      if (state.currentMealPlan && state.currentMealPlan.meals) {
        return state.currentMealPlan.meals
          .filter((meal: MealPlanRecipe) => meal.meal_date === date)
          .map((meal: MealPlanRecipe) => ({
            id: meal.id,
            recipe: meal.recipe!,
            meal_type: meal.meal_type,
            meal_date: meal.meal_date,
            servings: meal.servings,
            is_leftover: meal.is_leftover
          }))
      }
      return []
    },

    /**
     * Get upcoming meals (next 5 meals from current date)
     */
    upcomingMeals: (state): DailyMeal[] => {
      if (!state.currentMealPlan || !state.currentMealPlan.meals) {
        return []
      }

      const today = new Date().toISOString().split('T')[0]

      return state.currentMealPlan.meals
        .filter((meal: MealPlanRecipe) => meal.meal_date >= today)
        .sort((a: MealPlanRecipe, b: MealPlanRecipe) => {
          if (a.meal_date !== b.meal_date) {
            return a.meal_date.localeCompare(b.meal_date)
          }
          // Sort by meal type within the same day
          const mealTypeOrder = { breakfast: 1, lunch: 2, dinner: 3, snack: 4 }
          return mealTypeOrder[a.meal_type] - mealTypeOrder[b.meal_type]
        })
        .slice(0, 5)
        .map((meal: MealPlanRecipe) => ({
          id: meal.id,
          recipe: meal.recipe!,
          meal_type: meal.meal_type,
          meal_date: meal.meal_date,
          servings: meal.servings,
          is_leftover: meal.is_leftover
        }))
    },

    /**
     * Get today's meals
     */
    todaysMeals: (state): DailyMeal[] => {
      return state.dailyMeals
    },

    /**
     * Check if data is currently loading
     */
    isLoading: (state): boolean => {
      return state.loading
    },

    /**
     * Get current error if any
     */
    currentError: (state): string | null => {
      return state.error
    }
  },

  actions: {
    /**
     * Fetch daily digest for today
     */
    async fetchDailyDigest() {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await $fetch<DailyDigestResponse>('/api/meal-plans/daily-digest')
        // this.dailyMeals = response.meals

        // Mock data for development
        this.dailyMeals = []
        console.warn('Using mock data - API not yet implemented')
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch daily digest'
        console.error('Error fetching daily digest:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch weekly meal plan
     */
    async fetchWeeklyPlan() {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await $fetch<MealPlan>('/api/meal-plans', {
        //   query: { is_active: true }
        // })
        // this.currentMealPlan = response

        // Mock data for development
        this.currentMealPlan = null
        console.warn('Using mock data - API not yet implemented')
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch weekly plan'
        console.error('Error fetching weekly plan:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * Swap a meal with a new recipe
     */
    async swapMeal(mealPlanRecipeId: number, newRecipeId: number) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call when backend is ready
        // await $fetch(`/api/meal-plan-recipes/${mealPlanRecipeId}/swap`, {
        //   method: 'PUT',
        //   body: { new_recipe_id: newRecipeId }
        // })

        // Optimistic update: update local state immediately
        if (this.currentMealPlan && this.currentMealPlan.meals) {
          const mealIndex = this.currentMealPlan.meals.findIndex(
            (m: MealPlanRecipe) => m.id === mealPlanRecipeId
          )
          if (mealIndex !== -1) {
            this.currentMealPlan.meals[mealIndex].recipe_id = newRecipeId
            // Note: Would need to fetch recipe details to update recipe object
          }
        }

        // Also update daily meals if the swapped meal is in today's meals
        const dailyMealIndex = this.dailyMeals.findIndex(m => m.id === mealPlanRecipeId)
        if (dailyMealIndex !== -1) {
          // Refresh daily digest after swap
          await this.fetchDailyDigest()
        }

        console.warn('Swap meal - API not yet implemented')
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to swap meal'
        console.error('Error swapping meal:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Select a different date
     */
    selectDate(date: string) {
      this.selectedDate = date
    },

    /**
     * Clear error state
     */
    clearError() {
      this.error = null
    },

    /**
     * Reset store to initial state
     */
    reset() {
      this.currentMealPlan = null
      this.dailyMeals = []
      this.selectedDate = new Date().toISOString().split('T')[0]
      this.loading = false
      this.error = null
    }
  }
})
