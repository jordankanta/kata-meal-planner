# TASK: Home Page - Daily Digest & Weekly Meal Plan

**Issue:** #1 | **Date:** 2025-11-06 | **Complexity:** XL | **Time:** 24h

## 📋 Summary

Implement the Home Page for MealPrep with two main views: (1) Mobile "Daily Digest" displaying today's meals with swap/cook actions, and (2) Desktop "This Week's Meal Plan" featuring an interactive calendar, weekly meal table, quick actions, and upcoming meals section. Both views must be responsive, visually appealing with orange theme (#FF8C00, #FFD700), and integrate with existing meal plan APIs.

## 🎯 Objectives

- [ ] Display daily meal digest with breakfast, lunch, dinner cards (mobile-first)
- [ ] Implement interactive weekly meal plan with calendar navigation (desktop)
- [ ] Enable "Swap Meal" functionality with alternative recipe suggestions
- [ ] Enable "Cook Now" action to view recipe details
- [ ] Create Quick Actions for adding recipes, creating meal plans, generating shopping lists
- [ ] Show upcoming meals with dates and times
- [ ] Ensure responsive design works seamlessly on mobile and desktop
- [ ] Handle empty states when no meals are planned

## 🔍 Technical Analysis

**Frontend:**
- HomePage component with mobile/desktop responsive views
- MealCard component (reusable for daily digest & upcoming meals)
- Calendar component with month navigation
- WeeklyMealTable component (desktop)
- QuickActions component (desktop)
- MealSwapModal component for swapping meals

**APIs:**
- `GET /api/meal-plans/daily-digest` - Retrieve today's meals
- `GET /api/meal-plans/{id}` - Retrieve weekly meal plan
- `GET /api/meal-plan-recipes/{id}/alternatives` - Get swap suggestions
- `PUT /api/meal-plan-recipes/{id}/swap` - Replace meal with alternative
- `POST /api/meal-plans` - Create new meal plan

**Database:**
- Uses existing `meal_plans`, `meal_plan_recipes`, `recipes` tables
- No schema changes required

**Dependencies:**
- Tailwind CSS for styling (orange theme: #FF8C00, #FFD700)
- Heroicons for icons (swap, cook, calendar, plus, list)
- Pinia store for meal plan state management
- date-fns for date formatting
- Headless UI for modals and interactive components

## 📐 Architecture

**Component Tree:**
```
pages/
└── index.vue (HomePage)
    ├── components/
    │   ├── home/
    │   │   ├── DailyDigest.vue (mobile view)
    │   │   ├── MealCard.vue (reusable)
    │   │   ├── WeeklyPlan.vue (desktop view)
    │   │   ├── Calendar.vue
    │   │   ├── WeeklyMealTable.vue
    │   │   ├── QuickActions.vue
    │   │   ├── UpcomingMeals.vue
    │   │   └── MealSwapModal.vue
```

**Data Flow:**
1. HomePage loads and fetches daily digest/weekly plan from API
2. Data stored in Pinia store (`useMealPlanStore`)
3. Components reactively display data from store
4. User actions (swap, cook, navigate) trigger store mutations
5. Store calls API and updates state

**State Management (Pinia):**
```typescript
useMealPlanStore:
  - dailyMeals: { breakfast, lunch, dinner }
  - weeklyPlan: { startDate, endDate, meals[] }
  - upcomingMeals: Meal[]
  - currentDate: Date
  - isLoading: boolean
  - error: string | null
```

## ✅ Development Plan

### Phase 1: State Management & API Integration

- [ ] **TASK-1.1** - Create Pinia meal plan store (M, 3h)
  - Create `stores/useMealPlanStore.ts`
  - Define state: dailyMeals, weeklyPlan, upcomingMeals, currentDate, loading, error
  - Actions: fetchDailyDigest(), fetchWeeklyPlan(startDate, endDate), swapMeal(mealPlanRecipeId, newRecipeId), fetchAlternatives(mealPlanRecipeId)
  - Getters: getDailyMealByType(mealType), getWeeklyMealsByDay(date), getUpcomingMeals()
  - Integrate with API endpoints using $fetch
  - Handle loading states and error handling
  - Tests: `useMealPlanStore.test.ts`
  - **Criteria:** Store successfully fetches and manages meal plan data, handles errors gracefully

- [ ] **TASK-1.2** - Create TypeScript types and interfaces (S, 1.5h)
  - Create `types/meal.ts`
  - Define interfaces: Meal, MealPlan, MealPlanRecipe, Recipe, MealType enum
  - Define DTOs: DailyDigestResponse, WeeklyPlanResponse, AlternativesResponse
  - Export all types for reuse across components
  - **Criteria:** All meal-related types are defined and exported

- [ ] **TASK-1.3** - Create API composable (M, 2h)
  - Create `composables/useMealPlanApi.ts`
  - Functions: fetchDailyDigest(), fetchWeeklyPlan(params), getMealAlternatives(id), swapMeal(id, newRecipeId), createMealPlan(params)
  - Handle authentication headers (Sanctum token)
  - Error handling with toast notifications
  - Tests: `useMealPlanApi.test.ts`
  - **Criteria:** API calls work with proper error handling and auth

### Phase 2: Core Components - Daily Digest (Mobile)

- [ ] **TASK-2.1** - Create MealCard component (M, 3h)
  - Create `components/home/MealCard.vue`
  - Props: meal (Meal), mealType (breakfast/lunch/dinner), showActions (boolean)
  - Display: meal image (fallback placeholder), meal name, meal type badge
  - Actions: "Swap Meal" button (outline, orange border), "Cook Now" button (filled, orange)
  - Emit events: @swap, @cook
  - Responsive design: full-width on mobile, fixed width on desktop
  - Handle long meal names with ellipsis or line wrap
  - Loading state for image
  - Tests: `MealCard.test.ts`
  - **Criteria:** Card displays correctly with proper styling, buttons emit events

- [ ] **TASK-2.2** - Create DailyDigest component (M, 3h)
  - Create `components/home/DailyDigest.vue`
  - Display header: "Daily Digest" title, current date in orange
  - Render 3 MealCard components for breakfast, lunch, dinner
  - Handle empty states: "No meal planned" with "Add Recipe" CTA
  - Vertical scrolling on mobile
  - Loading skeleton while fetching data
  - Handle @swap event -> open MealSwapModal
  - Handle @cook event -> navigate to recipe detail page
  - Tests: `DailyDigest.test.ts`
  - **Criteria:** Displays daily meals correctly, handles empty states, responsive on mobile

- [ ] **TASK-2.3** - Create MealSwapModal component (L, 4h)
  - Create `components/home/MealSwapModal.vue`
  - Props: isOpen (boolean), mealPlanRecipeId (number), currentMeal (Meal)
  - Use Headless UI Dialog for modal
  - Fetch alternatives from API on open
  - Display list of alternative recipes with images, names, prep time
  - User selects alternative -> confirm swap
  - Call swapMeal API on confirm
  - Loading states during fetch and swap
  - Error handling with error messages
  - Close modal on success or cancel
  - Tests: `MealSwapModal.test.ts`
  - **Criteria:** Modal opens, displays alternatives, swaps meal successfully, closes properly

### Phase 3: Desktop Components - Weekly Plan

- [ ] **TASK-3.1** - Create Calendar component (L, 5h)
  - Create `components/home/Calendar.vue`
  - Display current month and year (e.g., "July 2024")
  - Navigation arrows to switch months (< >)
  - Render calendar grid: 7 columns (S M T W T F S), 5-6 rows
  - Highlight current day with orange circle (#FF8C00)
  - Dim days outside current month (gray)
  - Emit @daySelect event with selected date
  - Use date-fns for date calculations
  - Responsive: hide on mobile, show on desktop (md:block)
  - Tests: `Calendar.test.ts`
  - **Criteria:** Calendar displays correctly, navigation works, current day highlighted, emits selection event

- [ ] **TASK-3.2** - Create WeeklyMealTable component (L, 5h)
  - Create `components/home/WeeklyMealTable.vue`
  - Props: startDate (Date), endDate (Date), meals (MealPlanRecipe[])
  - Display title: "This Week's Meal Plan" with date range
  - Render table: columns (Day, Breakfast, Lunch, Dinner), rows (Mon-Sun)
  - Meal names in orange (#FF8C00), clickable
  - Handle empty cells: show "—" or "Add meal" link
  - Click meal name -> navigate to recipe detail or open edit modal
  - Responsive: hide on mobile, show table layout on desktop
  - Tests: `WeeklyMealTable.test.ts`
  - **Criteria:** Table displays weekly meals, empty states handled, meals are clickable

- [ ] **TASK-3.3** - Create QuickActions component (M, 2.5h)
  - Create `components/home/QuickActions.vue`
  - Three action buttons vertically stacked:
    - "Add Recipe" (icon: plus) -> navigate to /recipes
    - "Create Meal Plan" (icon: calendar) -> open create meal plan modal/page
    - "Generate Grocery List" (icon: list) -> navigate to /grocery-list with auto-generate
  - Button style: transparent background, orange border (#FFD700), orange text (#FF8C00)
  - Hover states
  - Use Heroicons for icons
  - Responsive: hide on mobile, show on desktop sidebar
  - Tests: `QuickActions.test.ts`
  - **Criteria:** Buttons display correctly, navigate/trigger actions on click

- [ ] **TASK-3.4** - Create UpcomingMeals component (M, 3h)
  - Create `components/home/UpcomingMeals.vue`
  - Display title: "Upcoming Meals"
  - Render list of upcoming meals (next 5-7 meals)
  - Each meal card: thumbnail image, meal name, date/time (e.g., "Spaghetti Bolognese, July 22, 7:00 PM")
  - Light orange background (#FFF5E6) for cards
  - Click meal -> navigate to recipe detail
  - Handle empty state: "No upcoming meals"
  - Scrollable list if many meals
  - Responsive: stack vertically on mobile, sidebar on desktop
  - Tests: `UpcomingMeals.test.ts`
  - **Criteria:** Displays upcoming meals with correct formatting, clickable, responsive

- [ ] **TASK-3.5** - Create WeeklyPlan parent component (M, 2.5h)
  - Create `components/home/WeeklyPlan.vue`
  - Layout: Calendar (top), WeeklyMealTable (center), QuickActions (left sidebar), UpcomingMeals (right sidebar)
  - Use CSS Grid or Flexbox for desktop layout
  - Handle calendar day selection -> update meal table if needed
  - Fetch weekly plan data on mount
  - Loading states for all sections
  - Responsive: hide on mobile, show on desktop (md:grid)
  - Tests: `WeeklyPlan.test.ts`
  - **Criteria:** Desktop layout displays correctly with all sections, responsive behavior works

### Phase 4: Main Page Integration

- [ ] **TASK-4.1** - Create HomePage component (M, 3h)
  - Create/update `pages/index.vue`
  - Import DailyDigest and WeeklyPlan components
  - Display DailyDigest on mobile (md:hidden)
  - Display WeeklyPlan on desktop (hidden md:block)
  - Implement app header: "MealPrep" logo, navigation tabs (Home, Recipes, Grocery List, Settings), notification icon, profile picture
  - Use Nuxt layout or create AppHeader component
  - Fetch initial data on page load (dailyDigest for mobile, weeklyPlan for desktop)
  - Handle loading states with skeletons
  - Handle errors with error messages and retry button
  - Tests: `index.test.ts`
  - **Criteria:** Page displays correctly on mobile and desktop, data loads properly, navigation works

- [ ] **TASK-4.2** - Create AppHeader component (M, 2.5h)
  - Create `components/layout/AppHeader.vue`
  - Mobile: "MealPrep" title centered, menu icon (hamburger) on right
  - Desktop: "MealPrep" logo left, navigation tabs (Home, Recipes, Grocery List, Settings) center, notification icon + profile right
  - Active tab highlighted in orange
  - Fixed position at top
  - Use Headless UI Menu for mobile dropdown navigation
  - Use Heroicons for icons
  - Tests: `AppHeader.test.ts`
  - **Criteria:** Header displays correctly on mobile/desktop, navigation works, active tab highlighted

- [ ] **TASK-4.3** - Implement responsive breakpoints and mobile navigation (M, 2h)
  - Configure Tailwind breakpoints if needed
  - Implement mobile menu (hamburger) with slide-out drawer
  - Use Headless UI Dialog for mobile menu
  - Smooth transitions for mobile menu open/close
  - Ensure all components respect mobile/desktop breakpoints
  - Test on various screen sizes (320px, 768px, 1024px, 1920px)
  - **Criteria:** Responsive design works seamlessly across all screen sizes

### Phase 5: Styling & Polish

- [ ] **TASK-5.1** - Implement orange theme and design system (M, 3h)
  - Configure Tailwind theme in `tailwind.config.js`
  - Add custom colors: primary (#FF8C00), secondary (#FFD700)
  - Define button variants: primary, secondary, outline
  - Create utility classes for cards, shadows, spacing
  - Ensure consistent spacing and padding across components
  - Apply rounded corners and shadows to cards
  - Verify color contrast for accessibility (4.5:1 ratio)
  - **Criteria:** Orange theme applied consistently, design system in place

- [ ] **TASK-5.2** - Add loading states and skeletons (M, 2.5h)
  - Create `components/ui/SkeletonCard.vue` for meal card skeleton
  - Create `components/ui/SkeletonTable.vue` for table skeleton
  - Create `components/ui/LoadingSpinner.vue`
  - Implement skeletons in DailyDigest, WeeklyMealTable, UpcomingMeals
  - Smooth transitions when data loads (fade-in)
  - Tests: `SkeletonCard.test.ts`, `SkeletonTable.test.ts`
  - **Criteria:** Loading states provide good UX, no layout shift

- [ ] **TASK-5.3** - Implement error handling and empty states (M, 2.5h)
  - Create `components/ui/ErrorMessage.vue` component
  - Create `components/ui/EmptyState.vue` component
  - Add error states to all API calls with retry functionality
  - Add empty states: "No meals planned" with "Add Recipe" CTA
  - Handle missing images with placeholder image
  - Display user-friendly error messages (not technical errors)
  - Tests: `ErrorMessage.test.ts`, `EmptyState.test.ts`
  - **Criteria:** Errors and empty states handled gracefully with clear messaging

- [ ] **TASK-5.4** - Optimize images and performance (M, 2h)
  - Implement lazy loading for meal images (use Nuxt Image)
  - Configure image optimization (WebP format, multiple sizes)
  - Use placeholder images for loading states
  - Optimize bundle size (check imports, code splitting)
  - Add Redis caching headers for API responses
  - Test performance: page load < 2s, API response < 500ms
  - **Criteria:** Images load efficiently, page performance meets targets

### Phase 6: Testing & Quality Assurance

- [ ] **TASK-6.1** - Write unit tests for components (L, 5h)
  - Test all components with Vitest and Vue Test Utils
  - Mock Pinia store and API calls
  - Test props, events, conditional rendering
  - Test user interactions (button clicks, form submissions)
  - Test responsive behavior (mobile vs desktop)
  - Aim for 80%+ code coverage
  - Files: `*.test.ts` for each component
  - **Criteria:** All components have comprehensive unit tests, 80%+ coverage

- [ ] **TASK-6.2** - Write integration tests (M, 3h)
  - Test HomePage with real store and mocked APIs
  - Test full user flows:
    - User views daily digest
    - User swaps a meal
    - User clicks "Cook Now"
    - User navigates calendar
    - User clicks quick actions
  - Test error scenarios (API failures, network errors)
  - Test empty states
  - Use Vitest for integration tests
  - **Criteria:** Integration tests cover main user flows, all pass

- [ ] **TASK-6.3** - Write E2E tests with Playwright (M, 3h)
  - Create `e2e/home.spec.ts`
  - Test scenarios:
    - HomePage loads and displays daily meals
    - User swaps a meal successfully
    - User navigates to recipe detail
    - Desktop view displays weekly plan
    - Calendar navigation works
    - Quick actions navigate correctly
  - Test on mobile and desktop viewports
  - Test with real API or mocked backend
  - **Criteria:** E2E tests cover critical paths, all pass

- [ ] **TASK-6.4** - Accessibility audit and fixes (M, 2.5h)
  - Run axe or Lighthouse accessibility audit
  - Ensure all images have alt text
  - Verify keyboard navigation works (tab, enter, arrows)
  - Test with screen reader (VoiceOver or NVDA)
  - Ensure proper ARIA labels for buttons and interactive elements
  - Verify color contrast meets WCAG 2.1 AA (4.5:1)
  - Fix semantic HTML issues (headings, landmarks)
  - Tests: Add accessibility tests to E2E suite
  - **Criteria:** Page meets WCAG 2.1 AA standards, no critical accessibility issues

### Phase 7: Documentation & Deployment

- [ ] **TASK-7.1** - Write component documentation (S, 1.5h)
  - Document each component with JSDoc comments
  - Document props, events, slots
  - Add usage examples in comments
  - Create `docs/components/HOME.md` with component overview
  - Include screenshots of mobile and desktop views
  - **Criteria:** All components are documented with clear usage examples

- [ ] **TASK-7.2** - Update README and project documentation (S, 1h)
  - Update main README.md with HomePage feature
  - Document environment variables if any
  - Update API documentation if endpoints changed
  - Add troubleshooting section for common issues
  - **Criteria:** Documentation is up-to-date and accurate

- [ ] **TASK-7.3** - Create PR and deployment checklist (S, 1h)
  - Create feature branch PR with screenshots
  - Fill out PR template with changes, testing notes, screenshots
  - Deployment checklist:
    - [ ] All tests pass (unit, integration, E2E)
    - [ ] Linting passes (ESLint, Prettier)
    - [ ] No console errors or warnings
    - [ ] Mobile and desktop views tested
    - [ ] Accessibility audit passed
    - [ ] Performance metrics met (< 2s page load)
    - [ ] Error handling tested
    - [ ] Empty states tested
  - **Criteria:** PR is ready for review with complete documentation

## 🛠️ Guidelines

**Best Practices:**
- Mobile-first approach: design for mobile, enhance for desktop
- Component reusability: MealCard used in multiple places
- Consistent naming conventions: use PascalCase for components, camelCase for functions
- Atomic commits: commit after each task completion
- Type safety: use TypeScript strict mode, no `any` types
- Error boundaries: wrap API calls in try-catch with proper error handling
- Optimistic updates: update UI immediately, revert on error
- Accessibility: keyboard navigation, ARIA labels, semantic HTML
- Performance: lazy loading, code splitting, image optimization

**Patterns:**
- Composition API with `<script setup>` for all Vue components
- Pinia for state management (not Vuex)
- Composables for reusable logic (e.g., `useMealPlanApi`)
- Tailwind utility classes for styling (no custom CSS unless necessary)
- Headless UI for accessible interactive components
- date-fns for date manipulation (not moment.js)

**Risks:**
- ⚠️ **Risk:** API performance issues with large meal plans
  - **Mitigation:** Implement pagination for weekly plans, use Redis caching, optimize queries
- ⚠️ **Risk:** Image loading delays causing poor UX
  - **Mitigation:** Lazy loading, placeholders, WebP optimization, CDN
- ⚠️ **Risk:** Empty state when user has no meal plan
  - **Mitigation:** Clear CTAs to create meal plan or add recipes, onboarding flow
- ⚠️ **Risk:** Mobile menu conflicts with daily digest scrolling
  - **Mitigation:** Use Headless UI Dialog with proper z-index and scroll lock
- ⚠️ **Risk:** Calendar navigation performance on older devices
  - **Mitigation:** Memoize calendar calculations, debounce month changes

**Optimization:**
- Performance: Page load < 2s, API response < 500ms, image lazy loading
- Accessibility: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- Responsive: Test on 320px (mobile), 768px (tablet), 1024px (desktop), 1920px (large desktop)
- SEO: Meta tags, Open Graph tags, semantic HTML
- Bundle size: Code splitting by route, dynamic imports for modals

## ✓ Acceptance Criteria

**From Issue - Mobile View:**
- [ ] App header displays "MealPrep" title and logo
- [ ] Daily Digest section shows current date in orange
- [ ] Three meal cards (Breakfast, Lunch, Dinner) display with images, names, and action buttons
- [ ] "Swap Meal" button opens modal with alternative suggestions and successfully swaps meal
- [ ] "Cook Now" button navigates to recipe detail page
- [ ] Images load quickly and display correctly (or show placeholder if missing)
- [ ] Smooth scrolling with no lag
- [ ] Long meal names are handled gracefully (ellipsis or wrap)
- [ ] Empty states show message and CTA to add meals

**From Issue - Desktop View:**
- [ ] Navigation bar displays with Home, Recipes, Grocery List, Settings tabs
- [ ] Monthly calendar displays with current day highlighted in orange
- [ ] Calendar navigation (< >) switches months correctly
- [ ] Weekly meal plan table shows all meals for the week (Mon-Sun x Breakfast/Lunch/Dinner)
- [ ] Meal names in table are clickable and navigate to recipe detail
- [ ] Quick Actions buttons are functional and navigate/trigger correct actions
- [ ] Upcoming Meals section displays future meals with dates/times
- [ ] Layout adapts properly to different screen sizes (desktop and tablet)
- [ ] All interactions work without errors

**General:**
- [ ] Tests achieve 80%+ code coverage
- [ ] No regressions in existing features
- [ ] Page meets WCAG 2.1 AA accessibility standards
- [ ] Page load time < 2s, API response < 500ms
- [ ] No console errors or warnings
- [ ] Works on Chrome, Firefox, Safari, Edge (latest versions)
- [ ] Works on iOS and Android mobile browsers

## 📚 References

- Issue: `docs/issues/issue-1.md`
- Mockups: `docs/issues/images/issue-1-comment-1-mobile.png`, `docs/issues/images/issue-1-comment-2-desktop.png`
- Stack: `docs/memory-bank/STACK.md`
- API: `docs/memory-bank/API.md`
- Database: `docs/memory-bank/DATABASE.md`
- Project Brief: `docs/memory-bank/PROJECT_BRIEF.md`
- Design System: Tailwind CSS with custom orange theme (#FF8C00, #FFD700)
- Icons: Heroicons (https://heroicons.com/)
- UI Components: Headless UI (https://headlessui.com/)
