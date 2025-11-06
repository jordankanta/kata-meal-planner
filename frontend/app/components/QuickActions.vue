<template>
  <div class="quick-actions bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-4">
      Quick Actions
    </h3>

    <div class="actions-list space-y-3">
      <button
        v-for="action in actions"
        :key="action.id"
        class="action-button w-full flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
        @click="handleActionClick(action.id)"
      >
        <!-- Icon -->
        <div
          class="icon-wrapper flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
          :class="action.iconBgClass"
        >
          <component :is="action.icon" class="w-6 h-6" :class="action.iconClass" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="action-title font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {{ action.title }}
          </div>
          <div class="action-description text-sm text-gray-600">
            {{ action.description }}
          </div>
        </div>

        <!-- Arrow -->
        <div class="arrow-icon flex-shrink-0">
          <ChevronRightIcon class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusCircleIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  iconClass: string
  iconBgClass: string
  path: string
}

const actions: QuickAction[] = [
  {
    id: 'add-recipe',
    title: 'Add Recipe',
    description: 'Browse and add new recipes to your collection',
    icon: PlusCircleIcon,
    iconClass: 'text-green-600',
    iconBgClass: 'bg-green-50 group-hover:bg-green-100',
    path: '/recipes'
  },
  {
    id: 'create-meal-plan',
    title: 'Create Meal Plan',
    description: 'Generate a new meal plan for the week',
    icon: CalendarIcon,
    iconClass: 'text-primary',
    iconBgClass: 'bg-primary/10 group-hover:bg-primary/20',
    path: '/meal-plans/create'
  },
  {
    id: 'generate-grocery-list',
    title: 'Generate Grocery List',
    description: 'Create shopping list from your meal plan',
    icon: ShoppingCartIcon,
    iconClass: 'text-blue-600',
    iconBgClass: 'bg-blue-50 group-hover:bg-blue-100',
    path: '/grocery-list/generate'
  }
]

/**
 * Handle action button click
 */
const handleActionClick = (actionId: string) => {
  const action = actions.find(a => a.id === actionId)

  if (!action) return

  // Navigate to the action's path
  navigateTo(action.path)
}
</script>

<style scoped>
.action-button {
  -webkit-tap-highlight-color: transparent;
}

.action-button:active {
  transform: scale(0.98);
}

/* Ensure text doesn't wrap awkwardly */
.action-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .action-title {
    white-space: normal;
  }
}
</style>
