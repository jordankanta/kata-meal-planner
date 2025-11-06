<template>
  <div
    class="recipe-card bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    @click="$emit('click', recipe)"
  >
    <div class="flex gap-4">
      <!-- Recipe Image -->
      <div class="flex-shrink-0">
        <img
          v-if="recipe.image_path"
          :src="recipe.image_path"
          :alt="recipe.title"
          class="w-20 h-20 rounded-lg object-cover"
          @error="onImageError"
        />
        <div
          v-else
          class="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <!-- Recipe Info -->
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-semibold text-gray-900 mb-1 truncate">
          {{ recipe.title }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-2 mb-2">
          {{ recipe.description }}
        </p>
        <div class="flex items-center gap-3 text-xs text-gray-500">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ recipe.total_time }} min
          </span>
          <span class="flex items-center gap-1 capitalize">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ recipe.difficulty }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/meal'

interface Props {
  recipe: Recipe
}

defineProps<Props>()

defineEmits<{
  click: [recipe: Recipe]
}>()

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  img.parentElement!.innerHTML = `
    <div class="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  `
}
</script>

<style scoped>
.recipe-card {
  transition: all 0.2s ease;
}

.recipe-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
