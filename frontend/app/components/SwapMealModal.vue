<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        @click.self="handleClose"
      >
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="translate-y-full md:translate-y-0 md:scale-95 opacity-0"
          enter-to-class="translate-y-0 md:scale-100 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="translate-y-0 md:scale-100 opacity-100"
          leave-to-class="translate-y-full md:translate-y-0 md:scale-95 opacity-0"
        >
          <div
            v-if="isOpen"
            class="modal-content bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <!-- Header -->
            <div class="modal-header flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  Swap Meal
                </h2>
                <p class="text-sm text-gray-600 mt-1">
                  Choose an alternative recipe
                </p>
              </div>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Close modal"
                @click="handleClose"
              >
                <XMarkIcon class="w-6 h-6" />
              </button>
            </div>

            <!-- Content -->
            <div class="modal-body flex-1 overflow-y-auto p-6">
              <!-- Loading State -->
              <div v-if="loading" class="space-y-4">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="skeleton-card bg-gray-100 rounded-lg p-4 h-24 animate-pulse"
                />
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="text-center py-8">
                <ExclamationTriangleIcon class="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p class="text-red-700 mb-4">{{ error }}</p>
                <button class="btn-outline" @click="loadAlternatives">
                  Try Again
                </button>
              </div>

              <!-- Empty State -->
              <div v-else-if="alternatives.length === 0" class="text-center py-8">
                <PhotoIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  No Alternatives Available
                </h3>
                <p class="text-gray-600">
                  We couldn't find any alternative recipes at this time
                </p>
              </div>

              <!-- Alternatives List -->
              <div v-else class="alternatives-grid space-y-3">
                <button
                  v-for="alternative in alternatives"
                  :key="alternative.id"
                  class="alternative-card w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                  :class="{ 'border-primary bg-primary/5': selectedAlternative?.id === alternative.id }"
                  @click="selectAlternative(alternative)"
                >
                  <!-- Image -->
                  <div class="alternative-image flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      v-if="alternative.image_path"
                      :src="getImageUrl(alternative.image_path)"
                      :alt="alternative.title"
                      class="w-full h-full object-cover"
                      @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <PhotoIcon class="w-8 h-8 text-gray-400" />
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 truncate">
                      {{ alternative.title }}
                    </h3>
                    <p class="text-sm text-gray-600 truncate">
                      {{ alternative.description }}
                    </p>
                    <div class="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                      <span class="flex items-center">
                        <ClockIcon class="w-3 h-3 mr-1" />
                        {{ alternative.total_time || alternative.prep_time + alternative.cook_time }} min
                      </span>
                      <span class="capitalize">{{ alternative.meal_type }}</span>
                    </div>
                  </div>

                  <!-- Selected Indicator -->
                  <div
                    v-if="selectedAlternative?.id === alternative.id"
                    class="flex-shrink-0"
                  >
                    <CheckCircleIcon class="w-6 h-6 text-primary" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer p-6 border-t border-gray-200 flex space-x-3">
              <button
                class="flex-1 btn-outline"
                :disabled="swapping"
                @click="handleClose"
              >
                Cancel
              </button>
              <button
                class="flex-1 btn-primary"
                :disabled="!selectedAlternative || swapping"
                @click="handleSwap"
              >
                <span v-if="swapping">Swapping...</span>
                <span v-else>Confirm Swap</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  PhotoIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import type { AlternativeRecipe } from '~/types/meal'
import { useMealPlanStore } from '../../stores/mealPlan'

interface Props {
  isOpen: boolean
  mealPlanRecipeId: number | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'swapped'): void
}>()

const mealPlanStore = useMealPlanStore()
const { getAlternatives, executeMealSwap } = useMealPlans()

const loading = ref(false)
const swapping = ref(false)
const error = ref<string | null>(null)
const alternatives = ref<AlternativeRecipe[]>([])
const selectedAlternative = ref<AlternativeRecipe | null>(null)

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
 * Load alternative recipes
 */
const loadAlternatives = async () => {
  if (!props.mealPlanRecipeId) return

  loading.value = true
  error.value = null
  alternatives.value = []
  selectedAlternative.value = null

  try {
    const data = await getAlternatives(props.mealPlanRecipeId)
    alternatives.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load alternatives'
    console.error('Error loading alternatives:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Select an alternative recipe
 */
const selectAlternative = (alternative: AlternativeRecipe) => {
  selectedAlternative.value = alternative
}

/**
 * Execute the swap
 */
const handleSwap = async () => {
  if (!selectedAlternative.value || !props.mealPlanRecipeId) return

  swapping.value = true
  error.value = null

  try {
    await executeMealSwap(props.mealPlanRecipeId, selectedAlternative.value.id)

    // Update the store
    await mealPlanStore.swapMeal(props.mealPlanRecipeId, selectedAlternative.value.id)

    // Show success message (could use a toast notification here)
    console.log('Meal swapped successfully')

    // Emit event and close modal
    emit('swapped')
    handleClose()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to swap meal'
    console.error('Error swapping meal:', err)
  } finally {
    swapping.value = false
  }
}

/**
 * Close the modal
 */
const handleClose = () => {
  if (!swapping.value) {
    emit('close')
  }
}

/**
 * Watch for modal open and load alternatives
 */
watch(() => props.isOpen, (newValue) => {
  if (newValue && props.mealPlanRecipeId) {
    loadAlternatives()
  }
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  overscroll-behavior: contain;
}

.modal-content {
  -webkit-overflow-scrolling: touch;
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

.alternative-card {
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 768px) {
  .modal-content {
    max-height: 85vh;
  }
}
</style>
