import { INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN } from "../constants/ingredientModal";
import type { TBurgerIngredients } from "../types/data";

type IngredientModalOpenAction = {
  readonly type: typeof INGREDIENT_MODAL_OPEN;
  readonly ingredient: TBurgerIngredients;
};
type IngredientModalCloseAction = {
  readonly type: typeof INGREDIENT_MODAL_CLOSE;
};

export type IngredientModalActions = IngredientModalOpenAction | IngredientModalCloseAction;

export const ingredientModalOpen = (ingredient: TBurgerIngredients): IngredientModalOpenAction => {
  return {
    type: INGREDIENT_MODAL_OPEN,
    ingredient,
  };
};

export const ingredientModalClose = (): IngredientModalCloseAction => {
  return {
    type: INGREDIENT_MODAL_CLOSE,
  };
};
