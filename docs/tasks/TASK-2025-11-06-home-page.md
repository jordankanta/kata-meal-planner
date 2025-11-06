# TASK: Home Page - Daily Digest & Weekly Meal Plan

**Issue:** #1 | **Date:** 2025-11-06 | **Complexity:** XL | **Time:** 32h

## 📋 Summary

Implement the Home Page with two responsive views: (1) Mobile Daily Digest showing today's meals with Swap/Cook actions, (2) Desktop Weekly Meal Plan with interactive calendar, meal table, quick actions, and upcoming meals section. Includes dynamic date navigation, meal management, and seamless mobile-to-desktop adaptation.

## 🎯 Objectives

- [ ] Display daily meal digest (breakfast, lunch, dinner) with meal cards
- [ ] Implement Swap Meal functionality with alternative suggestions
- [ ] Implement Cook Now navigation to recipe details
- [ ] Create weekly calendar view with current day highlight
- [ ] Build weekly meal plan table (7 days × 3 meals)
- [ ] Add quick action buttons (Add Recipe, Create Meal Plan, Generate Grocery List)
- [ ] Show upcoming meals section with preview cards
- [ ] Ensure responsive design (mobile-first, desktop-enhanced)
- [ ] Handle loading states and error scenarios

## 🔍 Technical Analysis

**Frontend:**
- `pages/index.vue` - Home page route
- `components/home/DailyDigest.vue` - Mobile daily view
- `components/home/WeeklyMealPlan.vue` - Desktop weekly view
- `components/home/MealCard.vue` - Individual meal card
- `components/home/Calendar.vue` - Interactive calendar
- `components/home/MealTable.vue` - Weekly meal table
- `components/home/QuickActions.vue` - Action buttons
- `components/home/UpcomingMeals.vue` - Upcoming meals list
- `components/layout/AppHeader.vue` - Top navigation bar
- `composables/useMealPlans.ts` - Meal plan data management
- `composables/useCalendar.ts` - Calendar logic
- `stores/mealPlan.ts` - Pinia store for meal plan state

**APIs:**
- `GET /api/meal-plans/daily-digest` - Today's meals
- `GET /api/meal-plans` - User's meal plans (weekly view)
- `GET /api/meal-plan-recipes/{id}/alternatives` - Swap suggestions
- `PUT /api/meal-plan-recipes/{id}/swap` - Execute swap
- `GET /api/recipes/{id}` - Recipe details for Cook Now

**Database:** Uses existing schema (meal_plans, meal_plan_recipes, recipes)

**Dependencies:**
- Tailwind CSS (colors: #FF8C00, #FFD700)
- Heroicons (swap, cook, calendar icons)
- date-fns (date formatting)
- Pinia (state management)
- @vueuse/core (responsive breakpoints)

## 📐 Architecture

**Component Tree:**
```
pages/index.vue
├── AppHeader (logo, navigation, profile)
├── DailyDigest (mobile: v-if="isMobile")
│   ├── DateDisplay
│   └── MealCard (×3: breakfast, lunch, dinner)
│       ├── Image
│       ├── MealName
│       └── Actions (Swap Meal, Cook Now)
└── WeeklyMealPlan (desktop: v-if="!isMobile")
    ├── Calendar (month view, day selection)
    ├── MealTable (7 days × 3 meals grid)
    ├── QuickActions (3 buttons)
    └── UpcomingMeals (preview cards)
```

**Data Flow:**
1. Page loads → fetch daily digest / weekly plan from API
2. Store data in Pinia store (reactive state)
3. Components consume store data
4. User actions (swap/cook) → API calls → update store → re-render

**State Management:**
- `mealPlanStore` holds current meal plan, daily meals, selected date
- Composables provide reusable logic for fetching and mutations
- Optimistic updates for better UX

## ✅ Development Plan

### Phase 1: Foundation & Setup (6h)

- [ ] **TASK-1.1** - Setup routing and page structure (S, 1.5h)
  - Create `pages/index.vue` with basic layout
  - Configure Nuxt route for home page
  - Add page metadata (title, description)
  - Files: `pages/index.vue`
  - Criteria: Home route accessible at `/`, renders placeholder

- [ ] **TASK-1.2** - Create Pinia meal plan store (M, 2.5h)
  - Create `stores/mealPlan.ts`
  - State: currentMealPlan, dailyMeals, selectedDate, loading, error
  - Actions: fetchDailyDigest, fetchWeeklyPlan, swapMeal, selectDate
  - Getters: mealsForDate, upcomingMeals
  - Files: `stores/mealPlan.ts`
  - Criteria: Store manages meal plan state, actions call API

- [ ] **TASK-1.3** - Create meal plans composable (M, 2h)
  - Create `composables/useMealPlans.ts`
  - Methods: fetchDailyDigest, fetchWeeklyPlan, getAlternatives, executeMealSwap
  - Error handling and loading states
  - Files: `composables/useMealPlans.ts`
  - Criteria: Composable wraps API calls, returns reactive data

### Phase 2: Shared Components (5h)

- [ ] **TASK-2.1** - Create AppHeader component (M, 2.5h)
  - Create `components/layout/AppHeader.vue`
  - Logo, app title "MealPrep"
  - Navigation tabs (Home, Recipes, Grocery List, Settings)
  - Notification icon + profile picture (right side)
  - Responsive: fixed top, white background
  - Files: `components/layout/AppHeader.vue`
  - Criteria: Header displays on all pages, navigation works

- [ ] **TASK-2.2** - Create MealCard component (M, 2.5h)
  - Create `components/home/MealCard.vue`
  - Props: meal (name, image, type), onSwap, onCook
  - Layout: image (cover), meal name, two action buttons
  - Buttons: "Swap Meal" (outline orange), "Cook Now" (solid orange)
  - Icons from Heroicons
  - Responsive: full width on mobile, constrained on desktop
  - Handle missing images (placeholder)
  - Files: `components/home/MealCard.vue`, `components/home/MealCard.test.ts`
  - Criteria: Renders meal with image, name, buttons; handles clicks

### Phase 3: Mobile Daily Digest (7h)

- [ ] **TASK-3.1** - Create DailyDigest component structure (M, 2h)
  - Create `components/home/DailyDigest.vue`
  - Layout: title "Daily Digest", date display, meal cards list
  - Date display: format "July 15, Monday" in orange
  - Vertical scrolling for meal cards
  - Files: `components/home/DailyDigest.vue`
  - Criteria: Component renders with static data

- [ ] **TASK-3.2** - Integrate daily digest API (M, 2.5h)
  - Connect DailyDigest to mealPlanStore
  - Fetch data on mount using composable
  - Map API response to MealCard props
  - Display loading spinner during fetch
  - Show error message if API fails
  - Empty state: "No meals planned for today"
  - Files: `components/home/DailyDigest.vue`
  - Criteria: Displays today's meals from API, handles errors

- [ ] **TASK-3.3** - Implement Swap Meal functionality (M, 2.5h)
  - Create modal/sheet for swap alternatives
  - Fetch alternatives via GET /meal-plan-recipes/{id}/alternatives
  - Display alternative meal cards (image + name)
  - On selection, call PUT /meal-plan-recipes/{id}/swap
  - Optimistic update in store
  - Show success/error toast
  - Files: `components/home/SwapMealModal.vue`, update `composables/useMealPlans.ts`
  - Criteria: User can swap meal, UI updates immediately, shows alternatives

- [ ] **TASK-3.4** - Implement Cook Now functionality (S, 1h)
  - Navigate to recipe detail page on "Cook Now" click
  - Pass recipe ID in route params
  - Files: `components/home/MealCard.vue`
  - Criteria: Clicking "Cook Now" redirects to `/recipes/{id}`

### Phase 4: Desktop Weekly View - Calendar (5h)

- [ ] **TASK-4.1** - Create Calendar composable (M, 2.5h)
  - Create `composables/useCalendar.ts`
  - Functions: generateCalendarDays, getCurrentMonth, navigateMonth, selectDay
  - Handle month navigation (prev/next)
  - Calculate weeks grid (7 days × 5-6 rows)
  - Mark current day, selected day
  - Files: `composables/useCalendar.ts`
  - Criteria: Composable generates calendar data, handles navigation

- [ ] **TASK-4.2** - Create Calendar component (M, 2.5h)
  - Create `components/home/Calendar.vue`
  - Month/year header with prev/next arrows
  - 7-column grid (S M T W T F S)
  - Day cells: number, click handler
  - Highlight current day (orange circle)
  - Gray out days from other months
  - Files: `components/home/Calendar.vue`
  - Criteria: Renders calendar, highlights today, allows day selection

### Phase 5: Desktop Weekly View - Meal Table (6h)

- [ ] **TASK-5.1** - Create MealTable component structure (M, 3h)
  - Create `components/home/MealTable.vue`
  - Title: "This Week's Meal Plan" + date range
  - Table: 4 columns (Day, Breakfast, Lunch, Dinner)
  - 7 rows (Monday-Sunday)
  - White background, light borders
  - Meal names in orange (#FF8C00)
  - Files: `components/home/MealTable.vue`
  - Criteria: Table renders with static data

- [ ] **TASK-5.2** - Integrate weekly meal plan API (M, 3h)
  - Connect to mealPlanStore
  - Fetch weekly plan via GET /api/meal-plans
  - Map meals to table cells by date and meal_type
  - Show empty cells for unplanned meals
  - Click meal name → opens recipe detail modal or navigates
  - Files: `components/home/MealTable.vue`
  - Criteria: Table displays current week's meals from API

### Phase 6: Desktop Quick Actions & Upcoming Meals (5h)

- [ ] **TASK-6.1** - Create QuickActions component (M, 2h)
  - Create `components/home/QuickActions.vue`
  - Three buttons: "Add Recipe", "Create Meal Plan", "Generate Grocery List"
  - Icons: +, calendar, list (Heroicons)
  - Outline orange buttons, vertical stack
  - Click handlers (placeholder navigation/modals)
  - Files: `components/home/QuickActions.vue`
  - Criteria: Buttons render and respond to clicks

- [ ] **TASK-6.2** - Create UpcomingMeals component (M, 3h)
  - Create `components/home/UpcomingMeals.vue`
  - Title: "Upcoming Meals"
  - List of meal preview cards
  - Each card: thumbnail image, meal name, date/time
  - Light orange background per card
  - Fetch from store.upcomingMeals getter
  - Files: `components/home/UpcomingMeals.vue`
  - Criteria: Shows next 3-5 upcoming meals with details

### Phase 7: Responsive Layout & Integration (4h)

- [ ] **TASK-7.1** - Create WeeklyMealPlan component (M, 2h)
  - Create `components/home/WeeklyMealPlan.vue`
  - Layout: Calendar + MealTable + QuickActions + UpcomingMeals
  - Use CSS Grid for desktop layout
  - Calendar top-left, table center, actions left, upcoming right
  - Files: `components/home/WeeklyMealPlan.vue`
  - Criteria: Desktop view displays all sections cohesively

- [ ] **TASK-7.2** - Implement responsive breakpoints (M, 2h)
  - Use @vueuse/core useBreakpoints in index.vue
  - Show DailyDigest on mobile (< 768px)
  - Show WeeklyMealPlan on desktop (≥ 768px)
  - Ensure smooth transitions between views
  - Test on various screen sizes
  - Files: `pages/index.vue`
  - Criteria: Correct view displays based on screen size

### Phase 8: Testing & Polish (4h)

- [ ] **TASK-8.1** - Unit tests for components (M, 2h)
  - Test MealCard: renders props, emits events
  - Test Calendar: generates correct days, handles navigation
  - Test MealTable: displays meals correctly
  - Mock API responses and store
  - Files: `components/**/*.test.ts`
  - Criteria: 80%+ test coverage on components

- [ ] **TASK-8.2** - Integration tests for home page (M, 2h)
  - Test daily digest flow: load → display meals → swap meal
  - Test weekly view flow: calendar selection → table updates
  - Test error states and empty states
  - Files: `pages/index.test.ts`
  - Criteria: Critical user flows work end-to-end

## 🛠️ Guidelines

**Best Practices:**
- Mobile-first responsive design (Tailwind breakpoints: sm, md, lg)
- Atomic component design (single responsibility)
- TypeScript interfaces for props and API responses
- Consistent error handling (toast notifications)
- Optimistic UI updates for better perceived performance
- Lazy load images with loading="lazy"
- Use semantic HTML (nav, main, section, article)

**Risks:**
- ⚠️ API response time may affect initial load → Implement skeleton loaders
- ⚠️ Large meal plan data on desktop → Paginate or limit to current week + upcoming
- ⚠️ Image sizes vary → Use object-cover and fixed aspect ratios
- ⚠️ Date/time handling across timezones → Use date-fns with UTC or user's locale
- ⚠️ Swap alternatives may be empty → Show fallback message

**Optimization:**
- Cache daily digest in Pinia (refresh on swap/cook actions)
- Debounce calendar navigation to reduce API calls
- Use WebP images with fallbacks
- Lazy load WeeklyMealPlan component on desktop
- Implement virtual scrolling for long meal lists (future)

**Accessibility:**
- Alt text for all meal images
- Keyboard navigation for calendar (arrow keys)
- Focus management in modals
- ARIA labels on icon buttons
- Color contrast 4.5:1 (orange on white meets WCAG AA)
- Screen reader announcements for swap success/failure

**Responsive Considerations:**
- Mobile: vertical scroll, full-width cards, larger touch targets (min 44×44px)
- Tablet: Consider showing both views or enhanced daily digest
- Desktop: multi-column layout, hover states, keyboard shortcuts

## ✓ Acceptance Criteria

- [ ] Mobile: Daily Digest displays today's breakfast, lunch, dinner with images and names
- [ ] Mobile: "Swap Meal" opens alternatives modal and successfully swaps meal
- [ ] Mobile: "Cook Now" navigates to recipe detail page
- [ ] Desktop: Calendar shows current month with today highlighted in orange
- [ ] Desktop: Weekly meal table displays all meals for current week
- [ ] Desktop: Quick action buttons are clickable and trigger appropriate actions
- [ ] Desktop: Upcoming meals section shows next meals with dates
- [ ] Responsive: Correct view shows based on screen width (< 768px = mobile, ≥ 768px = desktop)
- [ ] Loading states display during API calls (spinner or skeleton)
- [ ] Error states show user-friendly messages
- [ ] Empty states handled (no meals planned)
- [ ] Images load correctly with placeholders for missing images
- [ ] All interactions work on touch and mouse
- [ ] Tests cover 80%+ of component logic
- [ ] No console errors or warnings
- [ ] AppHeader renders with correct navigation items

## 📚 References

- Issue: `docs/issues/issue-1.md`
- Mockups:
  - Mobile: `docs/issues/images/issue-1-comment-1-mobile.png`
  - Desktop: `docs/issues/images/issue-1-comment-2-desktop.png`
- APIs: `docs/memory-bank/API.md`
- Database: `docs/memory-bank/DATABASE.md`
- Stack: `docs/memory-bank/STACK.md`
