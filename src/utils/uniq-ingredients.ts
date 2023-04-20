import { TBurgerIngredients } from "../services/types/data";

export const uniqIngredients = (idsArr: string[], ingredients: TBurgerIngredients[]) => {
  const ingredientsList: Map<string, TBurgerIngredients> = new Map();

  idsArr.forEach((id) => {
    const findIngredient = ingredients.find((ingredient) => ingredient._id === id);

    if (findIngredient) {
      const currentIngredient = ingredientsList.get(id);

      if (currentIngredient) {
        ingredientsList.set(id, { ...currentIngredient, count: currentIngredient.count + 1 });
      } else {
        ingredientsList.set(id, { ...findIngredient, count: 1 });
      }
    }
  });

  return [...ingredientsList.values()];
};
