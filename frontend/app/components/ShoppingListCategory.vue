<template>
  <div class="category-section mb-6">
    <!-- Category Header -->
    <h3 class="text-lg font-semibold text-gray-900 mb-3 capitalize">
      {{ categoryName }}
    </h3>

    <!-- Items List -->
    <div class="space-y-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
      >
        <!-- Checkbox -->
        <button
          :class="[
            'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            item.is_checked
              ? 'bg-orange-500 border-orange-500'
              : 'border-gray-300 hover:border-orange-500'
          ]"
          @click="$emit('toggle', item.id)"
        >
          <svg
            v-if="item.is_checked"
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>

        <!-- Item Details -->
        <div class="flex-1 min-w-0">
          <p
            :class="[
              'text-sm font-medium',
              item.is_checked ? 'text-gray-400 line-through' : 'text-gray-900'
            ]"
          >
            {{ item.quantity }} {{ item.unit }} {{ item.name }}
          </p>
          <p v-if="item.notes" class="text-xs text-gray-500 mt-1">
            {{ item.notes }}
          </p>
        </div>

        <!-- Custom Item Badge -->
        <span
          v-if="item.is_custom"
          class="flex-shrink-0 text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded"
        >
          Custom
        </span>

        <!-- Delete Button (for custom items) -->
        <button
          v-if="item.is_custom"
          class="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
          @click="$emit('delete', item.id)"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="text-center py-4 text-gray-500 text-sm">
        No items in this category
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import type { ShoppingListItem } from '~/types/shopping'

interface Props {
  category: string
  items: ShoppingListItem[]
}

const props = defineProps<Props>()

defineEmits<{
  toggle: [itemId: number]
  delete: [itemId: number]
}>()

const categoryName = computed(() => {
  return props.category.charAt(0).toUpperCase() + props.category.slice(1)
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
