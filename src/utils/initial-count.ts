import { TBurgerIngredients } from "../services/types/types";

export const initialCount = (ingredients: TBurgerIngredients[]) => {
  return ingredients.map((ingredient) => ({ ...ingredient, count: 0 }));
};
