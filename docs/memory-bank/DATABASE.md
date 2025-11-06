# Database Schema - MealPrep Application

MySQL 8.0+ with Laravel 11.x Eloquent ORM

---

## Core Tables

### users
```sql
id, name, email (unique), email_verified_at, password, remember_token, created_at, updated_at
```

### user_preferences (1:1 with users)
```sql
id, user_id (FK→users),
dietary_type ENUM('omnivore','vegetarian','vegan','pescatarian','keto','paleo','low_carb','mediterranean'),
meals_per_day (2-4), meal_plan_duration (days),
include_leftovers, auto_generate_shopping_list,
created_at, updated_at
```

### dietary_restrictions (master)
```sql
id, name (unique), description, created_at, updated_at
```
Examples: Vegetarian, Vegan, Gluten-Free, Dairy-Free, Nut-Free, Keto, Low Carb, Paleo

### allergies (master)
```sql
id, name (unique), description, created_at, updated_at
```
Examples: Peanuts, Tree Nuts, Dairy, Eggs, Soy, Wheat, Gluten, Shellfish, Fish, Sesame

### ingredients (master)
```sql
id, name,
category ENUM('produce','dairy','meat','seafood','pantry','spices','beverages','frozen','bakery','other'),
unit (default measurement), created_at, updated_at
```
Indexed: name, category

### recipes
```sql
id, title, description, instructions,
prep_time, cook_time, total_time (minutes),
servings, difficulty ENUM('easy','medium','hard'),
meal_type ENUM('breakfast','lunch','dinner','snack','dessert'),
image_path, is_active, created_at, updated_at
```
Indexed: meal_type, difficulty, is_active, FULLTEXT(title, description)

### meal_plans
```sql
id, user_id (FK→users), start_date, end_date, is_active, created_at, updated_at
```
Indexed: user_id, dates, is_active

### meal_plan_recipes
```sql
id, meal_plan_id (FK→meal_plans), recipe_id (FK→recipes),
meal_date, meal_type ENUM('breakfast','lunch','dinner','snack'),
is_leftover, servings, notes, created_at, updated_at
```
Unique: (meal_plan_id, meal_date, meal_type) - one recipe per meal slot
Indexed: meal_plan_id, recipe_id, meal_date, meal_type

### shopping_lists
```sql
id, user_id (FK→users), meal_plan_id (FK→meal_plans, nullable),
name, is_completed, created_at, updated_at
```

### shopping_list_items
```sql
id, shopping_list_id (FK→shopping_lists), ingredient_id (FK→ingredients, nullable),
name, quantity, unit,
category ENUM('produce','dairy','meat','seafood','pantry','spices','beverages','frozen','bakery','other'),
is_checked, is_custom (user-added vs auto-generated), notes,
created_at, updated_at
```
Indexed: shopping_list_id, ingredient_id, category, is_checked

---

## Pivot Tables (Many-to-Many)

### user_dietary_restrictions
```sql
id, user_id (FK→users), dietary_restriction_id (FK→dietary_restrictions)
```
Unique: (user_id, dietary_restriction_id)

### user_allergies
```sql
id, user_id (FK→users), allergy_id (FK→allergies)
```
Unique: (user_id, allergy_id)

### excluded_ingredients
```sql
id, user_id (FK→users), ingredient_id (FK→ingredients)
```
Unique: (user_id, ingredient_id) - user-specific ingredient exclusions

### recipe_dietary_restrictions
```sql
id, recipe_id (FK→recipes), dietary_restriction_id (FK→dietary_restrictions)
```
Unique: (recipe_id, dietary_restriction_id)

### recipe_ingredients
```sql
id, recipe_id (FK→recipes), ingredient_id (FK→ingredients),
quantity, unit, notes (e.g. "finely chopped"), created_at, updated_at
```

### recipe_allergens
```sql
id, recipe_id (FK→recipes), allergy_id (FK→allergies)
```
Unique: (recipe_id, allergy_id)

---

## Key Relationships

**One-to-One:**
- users → user_preferences

**One-to-Many:**
- users → meal_plans, shopping_lists
- meal_plans → meal_plan_recipes
- recipes → recipe_ingredients
- shopping_lists → shopping_list_items

**Many-to-Many:**
- users ↔ dietary_restrictions (via user_dietary_restrictions)
- users ↔ allergies (via user_allergies)
- users ↔ ingredients (via excluded_ingredients)
- recipes ↔ dietary_restrictions (via recipe_dietary_restrictions)
- recipes ↔ ingredients (via recipe_ingredients)
- recipes ↔ allergies (via recipe_allergens)

---

## Cascade Rules

**ON DELETE CASCADE:**
- User deleted → delete all user preferences, meal plans, shopping lists, allergies, restrictions
- Recipe deleted → delete all recipe relationships
- Meal plan deleted → delete all meal_plan_recipes

**ON DELETE SET NULL:**
- Meal plan deleted → shopping_list.meal_plan_id = NULL (preserve history)
- Ingredient deleted → shopping_list_items.ingredient_id = NULL (preserve custom items)

---

## Migration Order

1. users
2. dietary_restrictions, allergies, ingredients (independent)
3. user_preferences
4. user_dietary_restrictions, user_allergies, excluded_ingredients
5. recipes
6. recipe_dietary_restrictions, recipe_ingredients, recipe_allergens
7. meal_plans
8. meal_plan_recipes
9. shopping_lists
10. shopping_list_items

---

## Redis Cache Keys

- `user:preferences:{user_id}` (1hr)
- `user:meal_plan:{user_id}:active` (30min)
- `recipe:{recipe_id}` (24hr)
- `user:shopping_list:{user_id}:latest` (15min)
