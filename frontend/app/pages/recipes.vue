<template>
  <div class="recipes-page min-h-screen bg-gray-50">
    <AppHeader />

    <main class="container mx-auto px-4 py-6">
      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for recipes"
            class="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            @input="onSearchInput"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-6 overflow-x-auto">
        <div class="flex gap-2 pb-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            :class="[
              'px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors',
              activeFilter === filter.value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Recipes Section -->
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ filteredTitle }}
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <!-- Recipes List -->
      <div v-else-if="recipes.length > 0" class="space-y-3">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          @click="onRecipeClick"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
        <p class="text-gray-600">
          Try adjusting your filters or search query
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination && pagination.last_page > 1"
        class="mt-8 flex justify-center items-center gap-2"
      >
        <button
          :disabled="pagination.current_page === 1"
          class="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          @click="loadPage(pagination.current_page - 1)"
        >
          Previous
        </button>
        <span class="text-sm text-gray-600">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </span>
        <button
          :disabled="pagination.current_page === pagination.last_page"
          class="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          @click="loadPage(pagination.current_page + 1)"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Recipe } from '~/types/meal'
import type { PaginatedResponse } from '~/types/api'

// Set up page metadata
useHead({
  title: 'Recipes - MealPrep',
  meta: [
    {
      name: 'description',
      content: 'Browse and discover recipes for your meal planning'
    }
  ]
})

// Filter options
const filters = [
  { label: 'All', value: '' },
  { label: 'Quick & Easy', value: 'quick' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Gluten-Free', value: 'gluten-free' },
  { label: 'Low Carb', value: 'low-carb' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Desserts', value: 'snack' }
]

// State
const searchQuery = ref('')
const activeFilter = ref('')
const recipes = ref<Recipe[]>([])
const pagination = ref<PaginatedResponse<Recipe>['meta'] | null>(null)
const loading = ref(false)
const searchTimeout = ref<NodeJS.Timeout | null>(null)

// Composable
const { fetchRecipes } = useRecipes()

// Computed
const filteredTitle = computed(() => {
  if (searchQuery.value) {
    return `Search results for "${searchQuery.value}"`
  }
  const activeFilterObj = filters.find(f => f.value === activeFilter.value)
  return activeFilterObj?.label === 'All' ? 'All Recipes' : `${activeFilterObj?.label} Recipes`
})

// Methods
const loadRecipes = async (page = 1) => {
  loading.value = true
  try {
    const filters: any = {
      page,
      per_page: 10
    }

    if (searchQuery.value) {
      filters.search = searchQuery.value
    }

    // Map filter values to meal types
    if (activeFilter.value === 'breakfast' || activeFilter.value === 'lunch' ||
        activeFilter.value === 'dinner' || activeFilter.value === 'snack') {
      filters.meal_type = activeFilter.value
    }

    const response = await fetchRecipes(filters)
    recipes.value = response.data
    pagination.value = response.meta
  } catch (error) {
    console.error('Error loading recipes:', error)
    recipes.value = []
    pagination.value = null
  } finally {
    loading.value = false
  }
}

const setFilter = (filterValue: string) => {
  activeFilter.value = filterValue
  loadRecipes()
}

const onSearchInput = () => {
  // Debounce search
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    loadRecipes()
  }, 300)
}

const loadPage = (page: number) => {
  loadRecipes(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onRecipeClick = (recipe: Recipe) => {
  console.log('Recipe clicked:', recipe)
  // TODO: Navigate to recipe detail page or open modal
  // navigateTo(`/recipes/${recipe.id}`)
}

// Lifecycle
onMounted(() => {
  loadRecipes()
})
</script>

<style scoped>
.recipes-page {
  min-height: 100vh;
}

/* Ensure smooth scrolling for filter pills */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
