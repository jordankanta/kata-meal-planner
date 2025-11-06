<template>
  <div class="meal-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Meal Image -->
    <div class="meal-image relative w-full h-48 bg-gray-200 overflow-hidden">
      <img
        v-if="meal.recipe.image_path && !imageError"
        :src="getImageUrl(meal.recipe.image_path)"
        :alt="meal.recipe.title"
        class="w-full h-full object-cover"
        loading="lazy"
        @error="handleImageError"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10"
      >
        <PhotoIcon class="w-16 h-16 text-primary/40" />
      </div>

      <!-- Meal Type Badge -->
      <div class="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize shadow-sm">
        {{ meal.meal_type }}
      </div>

      <!-- Leftover Badge -->
      <div
        v-if="meal.is_leftover"
        class="absolute top-2 left-2 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow-sm"
      >
        Leftover
      </div>
    </div>

    <!-- Meal Details -->
    <div class="meal-details p-4">
      <!-- Meal Name -->
      <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
        {{ meal.recipe.title }}
      </h3>

      <!-- Meal Info -->
      <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
        <div class="flex items-center space-x-1">
          <ClockIcon class="w-4 h-4" />
          <span>{{ meal.recipe.total_time }} min</span>
        </div>
        <div class="flex items-center space-x-1">
          <UserGroupIcon class="w-4 h-4" />
          <span>{{ meal.servings }} servings</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          class="flex-1 btn-outline flex items-center justify-center space-x-2 py-2 px-4"
          :disabled="loading"
          @click="handleSwap"
        >
          <ArrowPathIcon class="w-5 h-5" />
          <span>Swap Meal</span>
        </button>
        <button
          class="flex-1 btn-primary flex items-center justify-center space-x-2 py-2 px-4"
          :disabled="loading"
          @click="handleCook"
        >
          <FireIcon class="w-5 h-5" />
          <span>Cook Now</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  FireIcon,
  ClockIcon,
  UserGroupIcon,
  PhotoIcon
} from '@heroicons/vue/24/outline'
import type { DailyMeal } from '~/types/meal'

interface Props {
  meal: DailyMeal
  loading?: boolean
}

interface Emits {
  (e: 'swap', mealId: number): void
  (e: 'cook', recipeId: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const imageError = ref(false)

/**
 * Get full image URL (handle relative paths)
 */
const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Assuming images are served from backend
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
const handleImageError = () => {
  imageError.value = true
}

/**
 * Handle swap meal button click
 */
const handleSwap = () => {
  emit('swap', props.meal.id)
}

/**
 * Handle cook now button click
 */
const handleCook = () => {
  emit('cook', props.meal.recipe.id)
}
</script>

<style scoped>
.meal-card {
  max-width: 100%;
}

@media (min-width: 768px) {
  .meal-card {
    max-width: 400px;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-outline:disabled,
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
