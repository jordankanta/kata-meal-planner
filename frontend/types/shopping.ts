export type ShoppingCategory = 'produce' | 'dairy' | 'meat' | 'seafood' | 'pantry' | 'spices' | 'beverages' | 'frozen' | 'bakery' | 'other'

export interface ShoppingListItem {
  id: number
  shopping_list_id: number
  ingredient_id?: number
  name: string
  quantity: number
  unit: string
  category: ShoppingCategory
  is_checked: boolean
  is_custom: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface ShoppingList {
  id: number
  user_id: number
  meal_plan_id?: number
  name: string
  is_completed: boolean
  created_at: string
  updated_at: string
  items?: ShoppingListItem[]
}

export interface ShoppingListByCategory {
  category: ShoppingCategory
  items: ShoppingListItem[]
}

export interface AddItemRequest {
  name: string
  quantity: number
  unit: string
  category: ShoppingCategory
  notes?: string
}
