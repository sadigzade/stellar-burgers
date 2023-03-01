import { INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN } from "./constants";

export const ingredientModalOpen = (ingredient) => {
  return {
    type: INGREDIENT_MODAL_OPEN,
    ingredient,
  };
};

export const ingredientModalClose = () => {
  return {
    type: INGREDIENT_MODAL_CLOSE,
  };
};
