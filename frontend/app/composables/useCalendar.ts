import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns'

export interface CalendarDay {
  date: Date
  dateString: string // YYYY-MM-DD
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

export interface CalendarWeek {
  days: CalendarDay[]
}

/**
 * Composable for calendar logic and state management
 */
export const useCalendar = () => {
  const currentMonth = ref(new Date())
  const selectedDate = ref(new Date())

  /**
   * Generate calendar days for the current month view
   * Includes days from previous/next months to fill the grid
   */
  const generateCalendarDays = computed((): CalendarWeek[] => {
    const monthStart = startOfMonth(currentMonth.value)
    const monthEnd = endOfMonth(currentMonth.value)

    // Get the start of the week for the first day of the month
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }) // Sunday

    // Get the end of the week for the last day of the month
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    // Get all days in the calendar range
    const allDays = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    })

    // Map to CalendarDay objects
    const calendarDays: CalendarDay[] = allDays.map(date => ({
      date,
      dateString: format(date, 'yyyy-MM-dd'),
      dayNumber: date.getDate(),
      isCurrentMonth: isSameMonth(date, currentMonth.value),
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate.value)
    }))

    // Group into weeks (7 days per week)
    const weeks: CalendarWeek[] = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push({
        days: calendarDays.slice(i, i + 7)
      })
    }

    return weeks
  })

  /**
   * Get formatted month and year (e.g., "November 2025")
   */
  const currentMonthLabel = computed(() => {
    return format(currentMonth.value, 'MMMM yyyy')
  })

  /**
   * Get formatted selected date
   */
  const selectedDateLabel = computed(() => {
    return format(selectedDate.value, 'MMMM d, yyyy')
  })

  /**
   * Navigate to previous month
   */
  const navigateToPreviousMonth = () => {
    currentMonth.value = subMonths(currentMonth.value, 1)
  }

  /**
   * Navigate to next month
   */
  const navigateToNextMonth = () => {
    currentMonth.value = addMonths(currentMonth.value, 1)
  }

  /**
   * Navigate to today
   */
  const navigateToToday = () => {
    const today = new Date()
    currentMonth.value = today
    selectedDate.value = today
  }

  /**
   * Select a specific date
   */
  const selectDay = (date: Date) => {
    selectedDate.value = date
    // If the selected date is in a different month, navigate to that month
    if (!isSameMonth(date, currentMonth.value)) {
      currentMonth.value = date
    }
  }

  /**
   * Select a date by string (YYYY-MM-DD)
   */
  const selectDateString = (dateString: string) => {
    const date = new Date(dateString)
    selectDay(date)
  }

  /**
   * Get the currently selected date as a string
   */
  const getSelectedDateString = computed(() => {
    return format(selectedDate.value, 'yyyy-MM-dd')
  })

  /**
   * Check if a specific date is selected
   */
  const isDateSelected = (date: Date): boolean => {
    return isSameDay(date, selectedDate.value)
  }

  /**
   * Get day names for header (Sun, Mon, Tue, etc.)
   */
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return {
    // State
    currentMonth: readonly(currentMonth),
    selectedDate: readonly(selectedDate),

    // Computed
    generateCalendarDays,
    currentMonthLabel,
    selectedDateLabel,
    getSelectedDateString,
    dayNames,

    // Methods
    navigateToPreviousMonth,
    navigateToNextMonth,
    navigateToToday,
    selectDay,
    selectDateString,
    isDateSelected
  }
}
