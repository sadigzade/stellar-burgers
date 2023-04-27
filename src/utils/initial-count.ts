import { TBurgerIngredients } from "../services/types/data";

export const initialCount = (ingredients: TBurgerIngredients[]) => {
  return ingredients.map((ingredient) => ({ ...ingredient, count: 0 }));
};
