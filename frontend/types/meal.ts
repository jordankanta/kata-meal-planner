export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Recipe {
  id: number
  title: string
  description: string
  instructions: string
  prep_time: number
  cook_time: number
  total_time: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  meal_type: MealType
  image_path?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MealPlan {
  id: number
  user_id: number
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  meals?: MealPlanRecipe[]
}

export interface MealPlanRecipe {
  id: number
  meal_plan_id: number
  recipe_id: number
  recipe?: Recipe
  meal_date: string
  meal_type: MealType
  is_leftover: boolean
  servings: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface DailyMeal {
  id: number
  recipe: Recipe
  meal_type: MealType
  meal_date: string
  servings: number
  is_leftover: boolean
}

export interface DailyDigestResponse {
  date: string
  meals: DailyMeal[]
}

export interface SwapMealRequest {
  new_recipe_id: number
}

export interface AlternativeRecipe {
  id: number
  title: string
  description: string
  image_path?: string
  prep_time: number
  cook_time: number
  meal_type: MealType
}
