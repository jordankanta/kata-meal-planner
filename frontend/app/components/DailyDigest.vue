<template>
  <div class="daily-digest w-full">
    <!-- Header -->
    <div class="digest-header mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Daily Digest
      </h2>
      <p class="text-lg font-medium text-primary">
        {{ formattedDate }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div
        v-for="i in 3"
        :key="i"
        class="skeleton-card bg-white rounded-lg shadow-md p-4 h-64 animate-pulse"
      >
        <div class="bg-gray-200 h-40 rounded mb-4" />
        <div class="bg-gray-200 h-4 rounded mb-2 w-3/4" />
        <div class="bg-gray-200 h-4 rounded w-1/2" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div class="flex justify-center mb-4">
        <ExclamationTriangleIcon class="w-12 h-12 text-red-500" />
      </div>
      <h3 class="text-lg font-semibold text-red-900 mb-2">
        Failed to Load Meals
      </h3>
      <p class="text-red-700 mb-4">
        {{ error }}
      </p>
      <button
        class="btn-primary"
        @click="retry"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!meals || meals.length === 0"
      class="empty-state bg-white rounded-lg shadow-md p-8 text-center"
    >
      <div class="flex justify-center mb-4">
        <CalendarDaysIcon class="w-16 h-16 text-gray-400" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        No Meals Planned for Today
      </h3>
      <p class="text-gray-600 mb-6">
        Start planning your meals to see them here
      </p>
      <button
        class="btn-primary"
        @click="handleCreatePlan"
      >
        Create Meal Plan
      </button>
    </div>

    <!-- Meal Cards -->
    <div v-else class="meals-list space-y-4">
      <div
        v-for="meal in sortedMeals"
        :key="meal.id"
        class="meal-card-wrapper"
      >
        <!-- Meal Type Label -->
        <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2 pl-1">
          {{ meal.meal_type }}
        </h3>

        <MealCard
          :meal="meal"
          :loading="swappingMealId === meal.id"
          @swap="handleSwapMeal"
          @cook="handleCookNow"
        />
      </div>
    </div>

    <!-- Swap Meal Modal -->
    <SwapMealModal
      :is-open="showSwapModal"
      :meal-plan-recipe-id="selectedMealId"
      @close="handleCloseSwapModal"
      @swapped="handleMealSwapped"
    />
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { CalendarDaysIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import type { DailyMeal } from '~/types/meal'

import { useMealPlanStore } from '../../stores/mealPlan'

interface Props {
  date?: string
}

const props = withDefaults(defineProps<Props>(), {
  date: () => new Date().toISOString().split('T')[0]
})

const mealPlanStore = useMealPlanStore()
const loading = ref(false)
const error = ref<string | null>(null)
const swappingMealId = ref<number | null>(null)
const showSwapModal = ref(false)
const selectedMealId = ref<number | null>(null)

// Get meals from store
const meals = computed(() => mealPlanStore.todaysMeals)

/**
 * Format the date for display
 */
const formattedDate = computed(() => {
  try {
    const date = new Date(props.date)
    return format(date, 'MMMM d, EEEE')
  } catch {
    return props.date
  }
})

/**
 * Sort meals by meal type order (breakfast, lunch, dinner, snack)
 */
const sortedMeals = computed(() => {
  if (!meals.value) return []

  const order = { breakfast: 1, lunch: 2, dinner: 3, snack: 4 }
  return [...meals.value].sort((a, b) => {
    return order[a.meal_type] - order[b.meal_type]
  })
})

/**
 * Load daily digest data
 */
const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    await mealPlanStore.fetchDailyDigest()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load meals'
    console.error('Error loading daily digest:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Retry loading data
 */
const retry = () => {
  loadData()
}

/**
 * Handle swap meal action
 */
const handleSwapMeal = (mealId: number) => {
  swappingMealId.value = mealId
  showSwapModal.value = true
  selectedMealId.value = mealId
}

/**
 * Handle cook now action
 */
const handleCookNow = (recipeId: number) => {
  // Navigate to recipe detail page
  navigateTo(`/recipes/${recipeId}`)
}

/**
 * Handle create meal plan action
 */
const handleCreatePlan = () => {
  // Navigate to meal plan creation
  navigateTo('/meal-plans/create')
}

/**
 * Clear swapping state after swap completes
 */
const clearSwappingState = () => {
  swappingMealId.value = null
}

/**
 * Handle closing swap modal
 */
const handleCloseSwapModal = () => {
  showSwapModal.value = false
  selectedMealId.value = null
  swappingMealId.value = null
}

/**
 * Handle successful meal swap
 */
const handleMealSwapped = async () => {
  showSwapModal.value = false
  selectedMealId.value = null
  swappingMealId.value = null

  // Reload daily digest to show updated meal
  await loadData()
}

// Expose method to parent
defineExpose({
  clearSwappingState,
  loadData
})

// No need for emit anymore since we handle swap internally

// Load data on mount
onMounted(() => {
  loadData()
})
</script>

<style scoped>
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

.meals-list {
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .meals-list {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}
</style>
