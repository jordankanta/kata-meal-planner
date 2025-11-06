# Recipes Page - Quick Reference

## Overview
The Recipes page provides a browsing and discovery interface for meal planning recipes with search, filtering, and pagination.

## Features

### 🔍 Search
- Full-text search across recipe titles and descriptions
- Debounced input (300ms) for optimal performance
- Clear search query to reset

### 🏷️ Filters
Filter recipes by:
- **All** - Show all recipes
- **Quick & Easy** - Fast recipes (ready for tag-based filtering)
- **Vegetarian** - Vegetarian recipes (ready for tag-based filtering)
- **Gluten-Free** - Gluten-free recipes (ready for tag-based filtering)
- **Low Carb** - Low carb recipes (ready for tag-based filtering)
- **Breakfast** - Morning meals
- **Lunch** - Midday meals
- **Dinner** - Evening meals
- **Desserts** - Snacks and desserts

### 📄 Pagination
- 10 recipes per page
- Previous/Next navigation
- Current page indicator

### 💳 Recipe Cards
Each card displays:
- Recipe image (80x80px, rounded)
- Recipe title
- Short description (2 lines max)
- Total preparation time
- Difficulty level

## Usage

### Accessing the Page
```
http://localhost:3000/recipes
```

Or click "Recipes" in the navigation header.

### Searching for Recipes
1. Type your search term in the search bar
2. Results update automatically after 300ms
3. Clear the search bar to see all recipes

### Filtering Recipes
1. Click any filter pill to activate it
2. The selected filter will highlight in orange
3. Recipe list updates immediately
4. Click "All" to reset filters

### Viewing Recipe Details
1. Click any recipe card
2. Detail page implementation coming soon

## Mock Data

Currently using 10 mock recipes for development:
- Avocado Toast
- Greek Salad
- Grilled Chicken Breast
- Veggie Stir Fry
- Overnight Oats
- Pasta Primavera
- Chocolate Chip Cookies
- Quinoa Buddha Bowl
- Salmon Teriyaki
- Smoothie Bowl

## Technical Details

### Component Structure
```
/app/pages/recipes.vue              # Main page
/app/components/RecipeCard.vue      # Recipe card component
/app/composables/useRecipes.ts      # API composable
```

### API Integration
Ready for backend integration:
- `GET /api/recipes` - List recipes with filters
- `GET /api/recipes/{id}` - Get recipe details

### Type Definitions
```typescript
interface Recipe {
  id: number
  title: string
  description: string
  instructions: string
  prep_time: number
  cook_time: number
  total_time: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  image_path?: string
  is_active: boolean
  created_at: string
  updated_at: string
}
```

## Customization

### Adding New Filters
Edit `frontend/app/pages/recipes.vue`:
```typescript
const filters = [
  { label: 'Your Filter', value: 'your-value' },
  // ... existing filters
]
```

### Changing Items Per Page
Edit the `loadRecipes` method:
```typescript
const filters: any = {
  page,
  per_page: 20  // Change from 10 to desired number
}
```

### Styling
All styles use Tailwind CSS classes and can be customized:
- Search bar: Line 13-26 in `recipes.vue`
- Filters: Line 28-44 in `recipes.vue`
- Recipe cards: `RecipeCard.vue`

## Testing

Run tests:
```bash
npm test
```

Test files:
- `test/pages/recipes.test.ts`
- `test/components/RecipeCard.test.ts`

## Troubleshooting

### Issue: Recipes not loading
**Solution:** Check browser console for errors. Mock data should load automatically.

### Issue: Search not working
**Solution:** Verify the debounce timeout (300ms). Search updates after you stop typing.

### Issue: Images not displaying
**Solution:** Images use Unsplash CDN. Check internet connection. Fallback icons display if images fail.

### Issue: Filters not updating
**Solution:** Meal type filters (Breakfast, Lunch, Dinner, Desserts) work with mock data. Dietary filters require backend implementation.

## Next Steps

1. **Backend Integration**
   - Uncomment API calls in `useRecipes.ts`
   - Remove mock data
   - Test with real data

2. **Recipe Detail Page**
   - Create `/recipes/[id].vue`
   - Show full recipe information
   - Include ingredients and instructions

3. **Add to Meal Plan**
   - Add button to recipe cards
   - Open date/meal selector
   - Save to meal plan

## Resources

- [Issue #4: Recipe discovery](../docs/issues/issue-4.md)
- [Implementation docs](../docs/tasks/IMPLEMENTATION-recipes-page.md)
- [API documentation](../docs/memory-bank/API.md)
