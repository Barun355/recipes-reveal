import type { ComboIngridentInterface } from "@/components/RecipeIngredientCombobox";
import type { Recipes } from "@/types";
import { create } from "zustand";

interface RecipeStoreInteface {
  recipes: Recipes[];
  groups: any;
  getFeaturedRecipes: () => Recipes[];
  getHighProteinRecipeByTime: () => Recipes;
  getAllIngredients: () => ComboIngridentInterface[];
  setRecipes: (recipes: Recipes[]) => void;
  setGroups: (groups: any) => void;
}

const useRecipes = create<RecipeStoreInteface>()((set, get) => ({
  recipes: [],
  groups: [],
  getFeaturedRecipes: () => {
    let featuredRecipes: Recipes[] = [];
    set((prev) => {
      const localRecipes = prev.recipes;
      featuredRecipes = localRecipes
        .filter((recipe) => recipe.isFeatured)
        .slice(0, 6);
      return prev;
    });
    return featuredRecipes;
  },
  getHighProteinRecipeByTime: () => {
    const hour = new Date().getHours();
    // timeOfDay == 'morning' | 'afternoon' | 'evening' | 'night'
    let timeOfDay;

    if (hour >= 5 && hour < 12) {
      timeOfDay = "morning";
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = "afternoon";
    } else if (hour >= 17 && hour < 21) {
      timeOfDay = "evening";
    } else {
      timeOfDay = "night";
    }

    let timeBasedRecipe: Recipes;
    let tempRecip: Recipes[];

    const localRecipes = get().recipes;
    tempRecip = localRecipes.filter(
      (recipe) => recipe.isHighProtein && recipe.timeOfDay === timeOfDay
    );
    timeBasedRecipe =
      tempRecip[0] || localRecipes.filter((r) => r.isHighProtein)[0];

    return timeBasedRecipe;
  },
  getAllIngredients: () => {
    const localRecipes = get().recipes;

    const finalIngredients: ComboIngridentInterface[] = [];

    localRecipes.map((item) => {
      item.ingredients.map((ing) => {
        const ingredient = {
          label: ing.name,
          value: ing.name.replace(" ", "-").toLowerCase().trim(),
        };
        if (!finalIngredients.includes(ingredient)) {
          finalIngredients.push(ingredient);
        }
      });
    });
    const uniqueIngredients = Array.from(
      new Map(finalIngredients.map((item) => [item.value, item])).values()
    );
    console.log("uniqueIngredients: ", uniqueIngredients);
    return uniqueIngredients;
  },
  setRecipes: (recipes) => set({ recipes }),
  setGroups: (groups) => set({ groups }),
}));

export default useRecipes;
