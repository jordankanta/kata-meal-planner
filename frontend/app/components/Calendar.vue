<template>
  <div class="calendar-widget bg-white rounded-lg shadow-md p-4">
    <!-- Header -->
    <div class="calendar-header flex items-center justify-between mb-4">
      <button
        class="nav-button p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Previous month"
        @click="navigateToPreviousMonth"
      >
        <ChevronLeftIcon class="w-5 h-5 text-gray-600" />
      </button>

      <h3 class="text-lg font-semibold text-gray-900">
        {{ currentMonthLabel }}
      </h3>

      <button
        class="nav-button p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Next month"
        @click="navigateToNextMonth"
      >
        <ChevronRightIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Today Button -->
    <button
      class="today-button w-full mb-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
      @click="navigateToToday"
    >
      Today
    </button>

    <!-- Day Names -->
    <div class="day-names grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="dayName in dayNames"
        :key="dayName"
        class="day-name text-center text-xs font-medium text-gray-500 py-1"
      >
        {{ dayName }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-grid space-y-1">
      <div
        v-for="(week, weekIndex) in generateCalendarDays"
        :key="weekIndex"
        class="week-row grid grid-cols-7 gap-1"
      >
        <button
          v-for="(day, dayIndex) in week.days"
          :key="dayIndex"
          class="day-cell aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all"
          :class="getDayClasses(day)"
          :aria-label="format(day.date, 'MMMM d, yyyy')"
          :aria-current="day.isToday ? 'date' : undefined"
          @click="handleDayClick(day)"
          @keydown.enter="handleDayClick(day)"
          @keydown.space.prevent="handleDayClick(day)"
        >
          {{ day.dayNumber }}
        </button>
      </div>
    </div>

    <!-- Selected Date Display -->
    <div v-if="showSelectedDate" class="selected-date-display mt-4 pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600 text-center">
        Selected: <span class="font-medium text-gray-900">{{ selectedDateLabel }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import type { CalendarDay } from '~/composables/useCalendar'

interface Props {
  showSelectedDate?: boolean
}

interface Emits {
  (e: 'date-selected', date: string): void
}

const props = withDefaults(defineProps<Props>(), {
  showSelectedDate: true
})

const emit = defineEmits<Emits>()

const {
  currentMonthLabel,
  selectedDateLabel,
  dayNames,
  generateCalendarDays,
  navigateToPreviousMonth,
  navigateToNextMonth,
  navigateToToday,
  selectDay,
  getSelectedDateString
} = useCalendar()

/**
 * Get CSS classes for a day cell
 */
const getDayClasses = (day: CalendarDay): string[] => {
  const classes: string[] = []

  if (!day.isCurrentMonth) {
    classes.push('text-gray-300', 'hover:bg-gray-50')
  } else {
    classes.push('text-gray-900', 'hover:bg-primary/10')
  }

  if (day.isToday && !day.isSelected) {
    classes.push('ring-2', 'ring-primary', 'ring-inset')
  }

  if (day.isSelected) {
    classes.push('bg-primary', 'text-white', 'hover:bg-primary-dark')
  }

  return classes
}

/**
 * Handle day cell click
 */
const handleDayClick = (day: CalendarDay) => {
  selectDay(day.date)
  emit('date-selected', day.dateString)
}

/**
 * Keyboard navigation
 */
const handleKeyboardNavigation = (event: KeyboardEvent) => {
  const currentDate = new Date(getSelectedDateString.value)

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      currentDate.setDate(currentDate.getDate() - 1)
      selectDay(currentDate)
      emit('date-selected', format(currentDate, 'yyyy-MM-dd'))
      break
    case 'ArrowRight':
      event.preventDefault()
      currentDate.setDate(currentDate.getDate() + 1)
      selectDay(currentDate)
      emit('date-selected', format(currentDate, 'yyyy-MM-dd'))
      break
    case 'ArrowUp':
      event.preventDefault()
      currentDate.setDate(currentDate.getDate() - 7)
      selectDay(currentDate)
      emit('date-selected', format(currentDate, 'yyyy-MM-dd'))
      break
    case 'ArrowDown':
      event.preventDefault()
      currentDate.setDate(currentDate.getDate() + 7)
      selectDay(currentDate)
      emit('date-selected', format(currentDate, 'yyyy-MM-dd'))
      break
  }
}

// Add keyboard navigation support
onMounted(() => {
  window.addEventListener('keydown', handleKeyboardNavigation)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardNavigation)
})
</script>

<style scoped>
.calendar-widget {
  max-width: 350px;
  width: 100%;
}

.day-cell {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  min-width: 32px;
  min-height: 32px;
}

.day-cell:focus {
  outline: 2px solid #FF8C00;
  outline-offset: 2px;
}

.day-cell:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.nav-button {
  -webkit-tap-highlight-color: transparent;
}

.nav-button:active {
  transform: scale(0.95);
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .day-cell {
    min-width: 40px;
    min-height: 40px;
  }
}

@media (max-width: 380px) {
  .day-name {
    font-size: 10px;
  }

  .day-cell {
    font-size: 12px;
  }
}
</style>
