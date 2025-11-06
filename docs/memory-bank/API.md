# API Endpoints

## Authentication

- `POST /api/register` - Register a new user account
- `POST /api/login` - Authenticate user and receive API token
- `POST /api/logout` - Revoke current API token

## Recipes

- `GET /api/recipes` - Retrieve paginated list of recipes with filtering
- `GET /api/recipes/{id}` - Retrieve detailed recipe information

## User Preferences

- `GET /api/user/preferences` - Retrieve current user's meal planning preferences
- `PUT /api/user/preferences` - Update user's meal planning preferences

## Meal Plans

- `GET /api/meal-plans` - Retrieve user's meal plans
- `POST /api/meal-plans` - Create a new meal plan
- `GET /api/meal-plans/{id}` - Retrieve detailed meal plan with all scheduled meals
- `GET /api/meal-plans/daily-digest` - Get today's meal plan digest (Home Page view)
- `POST /api/meal-plans/{id}/meals` - Add a meal to a meal plan
- `PUT /api/meal-plan-recipes/{id}/swap` - Swap a meal with an alternative recipe suggestion
- `GET /api/meal-plan-recipes/{id}/alternatives` - Get alternative recipe suggestions for swapping
- `DELETE /api/meal-plan-recipes/{id}` - Remove a meal from a meal plan

## Shopping Lists

- `GET /api/shopping-lists` - Retrieve user's shopping lists
- `GET /api/shopping-lists/{id}` - Retrieve shopping list with all items organized by category
- `POST /api/shopping-lists` - Create a new shopping list from a meal plan
- `POST /api/shopping-lists/{id}/items` - Add a custom item to shopping list
- `PATCH /api/shopping-list-items/{id}/toggle` - Toggle purchased status of a shopping list item
- `DELETE /api/shopping-list-items/{id}` - Remove an item from shopping list
- `GET /api/shopping-lists/{id}/export` - Export shopping list to PDF format

## Reference Data

- `GET /api/dietary-restrictions` - Get all available dietary restrictions
- `GET /api/allergies` - Get all common allergens
- `GET /api/categories` - Get all shopping list categories
