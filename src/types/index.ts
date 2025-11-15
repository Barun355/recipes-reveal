export interface Recipes {
  id: string;
  userId: string;
  name: string;
  categories: {
    label: string;
    value: string;
    id: string;
  }[];
  image: string;
  previewImage: string;
  rating: number;
  reviews: number;
  prepTime: string;
  cookTime: string;
  calories: number;
  protein: number;
  description: string;
  servingSuggestions: string[];
  ingredients: {
    name: string;
    quantity: string;
    priceRange: string;
    estimatedPrice: number;
  }[];
  preCookingProcess: string[];
  cookingProcess: {
    [key: string]: string[];
  };
  postCookingProcess: string[];
  nutritionClassification: {
    protein: string;
    carbs: string;
    fats: string;
    fiber: string;
  };
  tipsAndTricks: string[];
  isHighProtein: boolean;
  timeOfDay: string;
  isFeatured: boolean;
}
