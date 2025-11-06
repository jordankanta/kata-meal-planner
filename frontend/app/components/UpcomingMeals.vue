<template>
  <div class="upcoming-meals bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">
      Upcoming Meals
    </h3>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 3"
        :key="i"
        class="skeleton-card bg-gray-100 rounded-lg h-20 animate-pulse"
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="upcomingMeals.length === 0" class="empty-state text-center py-8">
      <CalendarIcon class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <p class="text-sm text-gray-600">
        No upcoming meals planned
      </p>
    </div>

    <!-- Meals List -->
    <div v-else class="meals-list space-y-3">
      <button
        v-for="meal in upcomingMeals"
        :key="meal.id"
        class="meal-preview-card w-full flex items-center space-x-3 p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-left group"
        @click="handleMealClick(meal)"
      >
        <!-- Thumbnail -->
        <div class="meal-thumbnail flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
          <img
            v-if="meal.recipe.image_path && !imageErrors[meal.id]"
            :src="getImageUrl(meal.recipe.image_path)"
            :alt="meal.recipe.title"
            class="w-full h-full object-cover"
            @error="handleImageError(meal.id)"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center"
          >
            <PhotoIcon class="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <!-- Details -->
        <div class="flex-1 min-w-0">
          <div class="meal-name font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
            {{ meal.recipe.title }}
          </div>
          <div class="meal-meta flex items-center space-x-2 mt-1 text-xs text-gray-600">
            <span class="flex items-center">
              <CalendarIcon class="w-3 h-3 mr-1" />
              {{ formatMealDate(meal.meal_date, meal.meal_type) }}
            </span>
            <span class="w-1 h-1 rounded-full bg-gray-400" />
            <span class="capitalize">{{ meal.meal_type }}</span>
          </div>
        </div>

        <!-- Arrow -->
        <div class="arrow-icon flex-shrink-0">
          <ChevronRightIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
      </button>
    </div>

    <!-- View All Button -->
    <button
      v-if="upcomingMeals.length > 0"
      class="view-all-button w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
      @click="handleViewAll"
    >
      View Full Calendar
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  CalendarIcon,
  PhotoIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'
import type { DailyMeal } from '~/types/meal'
import { useMealPlanStore } from '../../stores/mealPlan'

const mealPlanStore = useMealPlanStore()
const loading = ref(false)
const imageErrors = ref<Record<number, boolean>>({})

/**
 * Get upcoming meals from store
 */
const upcomingMeals = computed(() => {
  return mealPlanStore.upcomingMeals
})

/**
 * Get full image URL
 */
const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  let apiBaseUrl = 'http://localhost:8000'
  try {
    const config = useRuntimeConfig()
    apiBaseUrl = config.public?.apiBaseUrl || 'http://localhost:8000'
  } catch (e) {
    // Fallback if runtime config not available
  }
  return `${apiBaseUrl}/storage/${imagePath}`
}

/**
 * Handle image loading error
 */
const handleImageError = (mealId: number) => {
  imageErrors.value[mealId] = true
}

/**
 * Format meal date and time for display
 */
const formatMealDate = (dateString: string, mealType: string): string => {
  try {
    const date = parseISO(dateString)

    if (isToday(date)) {
      return 'Today'
    }

    if (isTomorrow(date)) {
      return 'Tomorrow'
    }

    return format(date, 'EEE, MMM d')
  } catch {
    return dateString
  }
}

/**
 * Handle meal card click
 */
const handleMealClick = (meal: DailyMeal) => {
  // Navigate to recipe details
  navigateTo(`/recipes/${meal.recipe.id}`)
}

/**
 * Handle view all button click
 */
const handleViewAll = () => {
  // Scroll to calendar or navigate to full meal plan view
  // For now, just emit an event or do nothing
  console.log('View all meals clicked')
}

/**
 * Load upcoming meals
 */
const loadUpcomingMeals = async () => {
  loading.value = true

  try {
    // The store should already have the meal plan loaded
    // If not, fetch it
    if (!mealPlanStore.currentMealPlan) {
      await mealPlanStore.fetchWeeklyPlan()
    }
  } catch (err) {
    console.error('Error loading upcoming meals:', err)
  } finally {
    loading.value = false
  }
}

// Load on mount
onMounted(() => {
  loadUpcomingMeals()
})
</script>

<style scoped>
.meal-preview-card {
  -webkit-tap-highlight-color: transparent;
}

.meal-preview-card:active {
  transform: scale(0.98);
}

.skeleton-card {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.view-all-button {
  -webkit-tap-highlight-color: transparent;
}
</style>
