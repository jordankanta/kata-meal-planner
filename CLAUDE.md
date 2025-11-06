# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MealPlanner** (also called **MealPrep**) is a meal planning application that helps users organize their weekly menus, discover recipes tailored to their dietary preferences, and automatically generate shopping lists.

This is a kata/training project with comprehensive documentation in French. The actual implementation has not yet started - currently only documentation exists.

## Architecture

### Stack
- **Backend**: Laravel (PHP) - REST API
- **Frontend**: Nuxt 3 (Vue.js)
- **Database**: MySQL
- **Auth**: Laravel Sanctum

### Structure
```
Frontend (Nuxt 3) ←─ HTTP/REST/JSON ─→ Backend (Laravel) ←─ ORM ─→ MySQL
```

### Backend Organization (Planned)
- `app/Http/Controllers/Api/` - API controllers (Auth, Recipe, MealPlan, ShoppingList, UserPreference)
- `app/Models/` - Eloquent models (User, Recipe, MealPlan, ShoppingList, etc.)
- `app/Services/` - Business logic (MealPlanService, ShoppingListService, RecipeFilterService)

### Frontend Organization (Planned)
- `components/` - Vue components organized by feature (home, recipes, settings, shopping, common)
- `composables/` - Reusable composition functions (useApi, useAuth, useMealPlan, useRecipes)
- `pages/` - File-based routing pages
- `stores/` - Pinia state management

## Data Model

### Key Entities and Relations
- **User** → 1:1 UserPreference, N:M Allergies, 1:N MealPlans, 1:N ShoppingLists
- **MealPlan** → 1:N Meals, 1:1 ShoppingList
- **Recipe** → N:M Ingredients (via recipe_ingredients)
- **ShoppingList** → 1:N ShoppingListItems

### Core Tables
- Users & Preferences: `users`, `user_preferences`, `allergies`, `user_allergies`
- Recipes: `recipes`, `ingredients`, `recipe_ingredients`
- Planning: `meal_plans`, `meals`
- Shopping: `shopping_lists`, `shopping_list_items`

## API Endpoints (Planned)

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### User Preferences
- `GET /api/preferences` - Get user preferences
- `PUT /api/preferences` - Update preferences

### Recipes
- `GET /api/recipes` - List recipes (supports filters: dietary_preference, meal_type, tags, search)
- `GET /api/recipes/{id}` - Get recipe details

### Meal Plans
- `GET /api/meal-plans/current` - Get current meal plan
- `POST /api/meal-plans` - Create meal plan
- `POST /api/meal-plans/{id}/meals` - Add meal to plan
- `PUT /api/meals/{id}` - Update/swap meal
- `POST /api/meal-plans/generate` - Auto-generate meal plan

### Shopping Lists
- `POST /api/shopping-lists/generate` - Generate from meal plan
- `PUT /api/shopping-list-items/{id}/toggle` - Toggle item checked state
- `POST /api/shopping-lists/{id}/items` - Add manual item

## Core Features

### 1. Home Page
- **Mobile**: Daily Digest showing today's meals (Breakfast, Lunch, Dinner) with Swap/Cook actions
- **Desktop**: Weekly calendar view with monthly navigation, Quick Actions (Add Recipe, Create Meal Plan, Generate Grocery List)

### 2. Settings
- Dietary preferences (Omnivore, Vegetarian, Vegan, Pescatarian, Keto, Paleo, Low Carb, Mediterranean)
- Allergy management (multiple selection)
- Meals per day (2-4)
- Desktop only: Ingredient exclusions, plan duration, leftovers option, auto-generate shopping list

### 3. Shopping List
- Organized by categories (Produce, Dairy, Meat, Pantry)
- Check/uncheck purchased items
- Manual item addition
- Print functionality
- Auto-sync with meal plan recipes

### 4. Recipe Discovery
- Real-time keyword search
- Filters by diet type, meal time
- Card display with image, title, description
- Click for detailed recipe view

## Business Flows

### Initial Setup
User → Settings → Save preferences → Ready for meal planning

### Creating Meal Plan
Browse recipes (filtered) → Add to plan → Saves Meal entries → Display weekly view

### Shopping List Generation
Click "Generate" → Aggregates ingredients from meal plan → Create shopping list → Display by category

### Meal Swap
Click "Swap Meal" → Fetch alternatives → Select new recipe → Update Meal → Refresh display

## Documentation Structure

### Memory Bank (`docs/memory_bank/`)
- `PROJECT_BRIEF.md` - Business vision, features, personas, user flows
- `ARCHITECTURE.md` - Technical architecture, data model, API endpoints, business flows
- `STACK.md` - Technical stack details

### Issues (`docs/issues/`)
Contains GitHub issues documentation:
- Issue #1: Home Page
- Issue #2: Settings
- Issue #3: Shopping List
- Issue #4: Recipe Discovery

### Rules (`docs/rules/`)
- `MARKDOWN_RULES.md` - Documentation writing principles: "Rester concis" (Stay concise)

## Important Notes

- **Language**: All documentation is in French. Code should follow English naming conventions.
- **Current State**: No actual implementation exists yet - this is a greenfield kata project.
- **Documentation First**: This project follows a documentation-first approach with detailed specs before implementation.
- **Conciseness**: Follow the "Rester concis" principle when creating documentation.
