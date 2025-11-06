<template>
  <div class="weekly-meal-plan w-full">
    <!-- Desktop Layout - Grid -->
    <div class="desktop-layout grid gap-6">
      <!-- Left Column: Calendar + Quick Actions -->
      <div class="left-column space-y-6">
        <Calendar
          :show-selected-date="true"
          @date-selected="handleDateSelected"
        />
        <QuickActions />
      </div>

      <!-- Center Column: Meal Table (spans 2 columns) -->
      <div class="center-column">
        <MealTable />
      </div>

      <!-- Right Column: Upcoming Meals -->
      <div class="right-column">
        <UpcomingMeals />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMealPlanStore } from '../../stores/mealPlan'
const mealPlanStore = useMealPlanStore()

/**
 * Handle date selection from calendar
 */
const handleDateSelected = (dateString: string) => {
  // Update store's selected date
  mealPlanStore.selectDate(dateString)

  // Could trigger additional actions like:
  // - Scroll to that day in the meal table
  // - Filter upcoming meals
  // - Show detail view for that date
  console.log('Date selected:', dateString)
}
</script>

<style scoped>
.weekly-meal-plan {
  padding: 1.5rem 0;
}

.desktop-layout {
  grid-template-columns: 350px 1fr 350px;
  grid-template-areas:
    "left center right";
}

.left-column {
  grid-area: left;
}

.center-column {
  grid-area: center;
  min-width: 0; /* Prevent grid blowout */
}

.right-column {
  grid-area: right;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .desktop-layout {
    grid-template-columns: 300px 1fr 300px;
  }
}

@media (max-width: 1024px) {
  .desktop-layout {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "left right"
      "center center";
  }
}

@media (max-width: 768px) {
  /* Mobile view will use DailyDigest instead */
  .desktop-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "center"
      "left"
      "right";
  }
}
</style>
