import type { ShoppingList, ShoppingListItem, AddItemRequest } from '~/types/shopping'
import type { ApiResponse } from '~/types/api'

/**
 * Composable for shopping list API operations
 */
export const useShoppingList = () => {
  let apiBaseUrl = 'http://localhost:8000'
  try {
    const config = useRuntimeConfig()
    apiBaseUrl = config.public?.apiBaseUrl || 'http://localhost:8000'
  } catch (e) {
    apiBaseUrl = 'http://localhost:8000'
  }

  /**
   * Fetch user's active shopping list
   */
  const fetchShoppingList = async (): Promise<ShoppingList | null> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<ShoppingList[]>>(
      //   `${apiBaseUrl}/api/shopping-lists`,
      //   {
      //     query: { is_completed: false },
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )
      // return response.data[0] || null

      // Mock data for development
      console.warn('fetchShoppingList: Using mock data - API not yet implemented')
      return generateMockShoppingList()
    } catch (error) {
      console.error('Error fetching shopping list:', error)
      throw new Error('Failed to fetch shopping list')
    }
  }

  /**
   * Toggle item checked status
   */
  const toggleItemChecked = async (itemId: number): Promise<void> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // await $fetch(
      //   `${apiBaseUrl}/api/shopping-list-items/${itemId}/toggle`,
      //   {
      //     method: 'PATCH',
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )

      // Mock implementation for development
      console.warn('toggleItemChecked: Using mock implementation - API not yet implemented')
      console.log(`Toggling item ${itemId}`)
    } catch (error) {
      console.error('Error toggling item:', error)
      throw new Error('Failed to toggle item')
    }
  }

  /**
   * Add custom item to shopping list
   */
  const addItem = async (shoppingListId: number, item: AddItemRequest): Promise<ShoppingListItem> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<ShoppingListItem>>(
      //   `${apiBaseUrl}/api/shopping-lists/${shoppingListId}/items`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: item
      //   }
      // )
      // return response.data

      // Mock implementation for development
      console.warn('addItem: Using mock implementation - API not yet implemented')
      const newItem: ShoppingListItem = {
        id: Date.now(),
        shopping_list_id: shoppingListId,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        is_checked: false,
        is_custom: true,
        notes: item.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return newItem
    } catch (error) {
      console.error('Error adding item:', error)
      throw new Error('Failed to add item')
    }
  }

  /**
   * Delete item from shopping list
   */
  const deleteItem = async (itemId: number): Promise<void> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // await $fetch(
      //   `${apiBaseUrl}/api/shopping-list-items/${itemId}`,
      //   {
      //     method: 'DELETE',
      //     headers: {
      //       'Accept': 'application/json',
      //     }
      //   }
      // )

      // Mock implementation for development
      console.warn('deleteItem: Using mock implementation - API not yet implemented')
      console.log(`Deleting item ${itemId}`)
    } catch (error) {
      console.error('Error deleting item:', error)
      throw new Error('Failed to delete item')
    }
  }

  /**
   * Generate shopping list from meal plan
   */
  const generateFromMealPlan = async (mealPlanId: number): Promise<ShoppingList> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await $fetch<ApiResponse<ShoppingList>>(
      //   `${apiBaseUrl}/api/shopping-lists`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: { meal_plan_id: mealPlanId }
      //   }
      // )
      // return response.data

      // Mock implementation for development
      console.warn('generateFromMealPlan: Using mock implementation - API not yet implemented')
      return generateMockShoppingList()
    } catch (error) {
      console.error('Error generating shopping list:', error)
      throw new Error('Failed to generate shopping list')
    }
  }

  return {
    fetchShoppingList,
    toggleItemChecked,
    addItem,
    deleteItem,
    generateFromMealPlan
  }
}

/**
 * Generate mock shopping list for development
 */
function generateMockShoppingList(): ShoppingList {
  const items: ShoppingListItem[] = [
    // Produce
    {
      id: 1,
      shopping_list_id: 1,
      name: 'Lettuce',
      quantity: 1,
      unit: 'head',
      category: 'produce',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 2,
      shopping_list_id: 1,
      name: 'Apples',
      quantity: 2,
      unit: 'lbs',
      category: 'produce',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 3,
      shopping_list_id: 1,
      name: 'Tomatoes',
      quantity: 4,
      unit: 'pcs',
      category: 'produce',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 4,
      shopping_list_id: 1,
      name: 'Avocados',
      quantity: 3,
      unit: 'pcs',
      category: 'produce',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    // Dairy
    {
      id: 5,
      shopping_list_id: 1,
      name: 'Milk',
      quantity: 1,
      unit: 'gallon',
      category: 'dairy',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 6,
      shopping_list_id: 1,
      name: 'Cheese',
      quantity: 8,
      unit: 'oz',
      category: 'dairy',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 7,
      shopping_list_id: 1,
      name: 'Greek Yogurt',
      quantity: 2,
      unit: 'cups',
      category: 'dairy',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    // Meat
    {
      id: 8,
      shopping_list_id: 1,
      name: 'Chicken Breast',
      quantity: 2,
      unit: 'lbs',
      category: 'meat',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 9,
      shopping_list_id: 1,
      name: 'Ground Beef',
      quantity: 1,
      unit: 'lb',
      category: 'meat',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    // Pantry
    {
      id: 10,
      shopping_list_id: 1,
      name: 'Rice',
      quantity: 2,
      unit: 'lbs',
      category: 'pantry',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 11,
      shopping_list_id: 1,
      name: 'Pasta',
      quantity: 1,
      unit: 'box',
      category: 'pantry',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 12,
      shopping_list_id: 1,
      name: 'Olive Oil',
      quantity: 1,
      unit: 'bottle',
      category: 'pantry',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    },
    {
      id: 13,
      shopping_list_id: 1,
      name: 'Canned Tomatoes',
      quantity: 2,
      unit: 'cans',
      category: 'pantry',
      is_checked: false,
      is_custom: false,
      created_at: '2025-11-06T00:00:00Z',
      updated_at: '2025-11-06T00:00:00Z'
    }
  ]

  return {
    id: 1,
    user_id: 1,
    meal_plan_id: 1,
    name: 'Weekly Shopping List',
    is_completed: false,
    created_at: '2025-11-06T00:00:00Z',
    updated_at: '2025-11-06T00:00:00Z',
    items
  }
}
