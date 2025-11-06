<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" @click="close"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="show"
              class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              @click.stop
            >
              <!-- Header -->
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900">Add Item</h3>
                <button
                  class="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  @click="close"
                >
                  <XMarkIcon class="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleSubmit">
                <!-- Item Name -->
                <div class="mb-4">
                  <label for="item-name" class="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    id="item-name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Tomatoes"
                  />
                </div>

                <!-- Quantity and Unit -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      id="quantity"
                      v-model.number="formData.quantity"
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label for="unit" class="block text-sm font-medium text-gray-700 mb-1">
                      Unit *
                    </label>
                    <input
                      id="unit"
                      v-model="formData.unit"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="lbs"
                    />
                  </div>
                </div>

                <!-- Category -->
                <div class="mb-4">
                  <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    v-model="formData.category"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="seafood">Seafood</option>
                    <option value="pantry">Pantry</option>
                    <option value="spices">Spices</option>
                    <option value="beverages">Beverages</option>
                    <option value="frozen">Frozen</option>
                    <option value="bakery">Bakery</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Notes -->
                <div class="mb-6">
                  <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    v-model="formData.notes"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="e.g., organic, ripe"
                  ></textarea>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 justify-end">
                  <button
                    type="button"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    @click="close"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ loading ? 'Adding...' : 'Add Item' }}
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { AddItemRequest, ShoppingCategory } from '~/types/shopping'

interface Props {
  show: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [item: AddItemRequest]
}>()

const loading = ref(false)
const formData = reactive<AddItemRequest>({
  name: '',
  quantity: 1,
  unit: '',
  category: 'produce' as ShoppingCategory,
  notes: ''
})

const resetForm = () => {
  formData.name = ''
  formData.quantity = 1
  formData.unit = ''
  formData.category = 'produce'
  formData.notes = ''
}

const close = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  loading.value = true
  try {
    emit('submit', { ...formData })
    close()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

// Reset form when modal closes
watch(() => props.show, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script>

<style scoped>
/* Prevent body scroll when modal is open */
.fixed.inset-0 {
  overscroll-behavior: contain;
}
</style>
