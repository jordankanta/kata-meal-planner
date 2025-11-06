<template>
  <div class="meal-table-wrapper bg-white rounded-lg shadow-md p-6">
    <!-- Header -->
    <div class="table-header mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-1">
        This Week's Meal Plan
      </h2>
      <p class="text-sm text-gray-600">
        {{ weekDateRange }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 7"
        :key="i"
        class="skeleton-row bg-gray-100 rounded h-16 animate-pulse"
      />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <ExclamationTriangleIcon class="w-10 h-10 text-red-500 mx-auto mb-3" />
      <p class="text-red-700 mb-4">{{ error }}</p>
      <button class="btn-primary" @click="loadData">
        Try Again
      </button>
    </div>

    <!-- Table -->
    <div v-else class="meal-table-container overflow-x-auto">
      <table class="meal-table w-full min-w-[600px]">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="table-header-cell text-left py-3 px-4 font-semibold text-gray-700">
              Day
            </th>
            <th class="table-header-cell text-left py-3 px-4 font-semibold text-gray-700">
              Breakfast
            </th>
            <th class="table-header-cell text-left py-3 px-4 font-semibold text-gray-700">
              Lunch
            </th>
            <th class="table-header-cell text-left py-3 px-4 font-semibold text-gray-700">
              Dinner
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(day, index) in weekDays"
            :key="day.dateString"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            :class="{ 'bg-primary/5': day.isToday }"
          >
            <!-- Day Column -->
            <td class="day-cell py-4 px-4">
              <div class="flex items-center space-x-2">
                <div
                  v-if="day.isToday"
                  class="w-2 h-2 rounded-full bg-primary"
                />
                <div>
                  <div class="font-semibold text-gray-900">
                    {{ day.dayName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ day.dateLabel }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Meal Columns -->
            <td
              v-for="mealType in mealTypes"
              :key="`${day.dateString}-${mealType}`"
              class="meal-cell py-4 px-4"
            >
              <button
                v-if="getMealForSlot(day.dateString, mealType)"
                class="meal-button text-left w-full group"
                @click="handleMealClick(getMealForSlot(day.dateString, mealType)!)"
              >
                <div class="meal-name font-medium text-primary group-hover:text-primary-dark transition-colors">
                  {{ getMealForSlot(day.dateString, mealType)!.recipe.title }}
                </div>
                <div class="meal-info flex items-center space-x-2 mt-1 text-xs text-gray-500">
                  <span class="flex items-center">
                    <ClockIcon class="w-3 h-3 mr-1" />
                    {{ getMealForSlot(day.dateString, mealType)!.recipe.total_time }}m
                  </span>
                  <span
                    v-if="getMealForSlot(day.dateString, mealType)!.is_leftover"
                    class="px-2 py-0.5 bg-secondary/30 rounded text-xs"
                  >
                    Leftover
                  </span>
                </div>
              </button>
              <div v-else class="empty-slot text-sm text-gray-400 italic">
                No meal planned
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State (when no meals at all) -->
    <div v-if="!loading && !error && weekMeals.length === 0" class="empty-state text-center py-12">
      <CalendarDaysIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        No Meal Plan Yet
      </h3>
      <p class="text-gray-600 mb-6">
        Create your first meal plan to get started
      </p>
      <button class="btn-primary" @click="handleCreatePlan">
        Create Meal Plan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClockIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday
} from 'date-fns'
import type { MealPlanRecipe, MealType } from '~/types/meal'
import { useMealPlanStore } from '../../stores/mealPlan'

interface DayInfo {
  date: Date
  dateString: string
  dayName: string
  dateLabel: string
  isToday: boolean
}

const mealPlanStore = useMealPlanStore()
const loading = ref(false)
const error = ref<string | null>(null)

const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner']

/**
 * Get current week's days
 */
const weekDays = computed((): DayInfo[] => {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }) // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  return days.map(date => ({
    date,
    dateString: format(date, 'yyyy-MM-dd'),
    dayName: format(date, 'EEEE'),
    dateLabel: format(date, 'MMM d'),
    isToday: isToday(date)
  }))
})

/**
 * Get week date range label
 */
const weekDateRange = computed(() => {
  if (weekDays.value.length === 0) return ''
  const start = weekDays.value[0].date
  const end = weekDays.value[weekDays.value.length - 1].date
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
})

/**
 * Get meals for the current week from store
 */
const weekMeals = computed((): MealPlanRecipe[] => {
  if (!mealPlanStore.currentMealPlan || !mealPlanStore.currentMealPlan.meals) {
    return []
  }

  const weekDateStrings = weekDays.value.map(d => d.dateString)

  return mealPlanStore.currentMealPlan.meals.filter((meal: MealPlanRecipe) => {
    return weekDateStrings.includes(meal.meal_date)
  })
})

/**
 * Get meal for a specific date and meal type
 */
const getMealForSlot = (dateString: string, mealType: MealType): MealPlanRecipe | null => {
  return weekMeals.value.find(
    meal => meal.meal_date === dateString && meal.meal_type === mealType
  ) || null
}

/**
 * Load meal plan data
 */
const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    await mealPlanStore.fetchWeeklyPlan()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load meal plan'
    console.error('Error loading weekly meal plan:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Handle meal click - navigate to recipe details
 */
const handleMealClick = (meal: MealPlanRecipe) => {
  if (meal.recipe) {
    navigateTo(`/recipes/${meal.recipe.id}`)
  }
}

/**
 * Handle create meal plan
 */
const handleCreatePlan = () => {
  navigateTo('/meal-plans/create')
}

// Load data on mount
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.meal-table-wrapper {
  min-height: 400px;
}

.meal-table {
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-cell {
  white-space: nowrap;
}

.meal-button {
  -webkit-tap-highlight-color: transparent;
}

.meal-button:hover .meal-name {
  text-decoration: underline;
}

.skeleton-row {
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

/* Responsive */
@media (max-width: 768px) {
  .meal-table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
