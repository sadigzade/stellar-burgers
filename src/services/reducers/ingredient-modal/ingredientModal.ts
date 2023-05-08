import { IngredientModalActions } from "../../actions/ingredientModal";
import { INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN } from "../../constants/ingredientModal";
import { TBurgerIngredients } from "../../types/data";

type IngredientModalState = {
  ingredient: Readonly<TBurgerIngredients> | null;
};

const initialState: IngredientModalState = {
  ingredient: null,
};

export const ingredientModalReducer = (
  state = initialState,
  action: IngredientModalActions,
): IngredientModalState => {
  switch (action.type) {
    case INGREDIENT_MODAL_OPEN: {
      return {
        ...state,
        ingredient: action.ingredient,
      };
    }
    case INGREDIENT_MODAL_CLOSE: {
      return {
        ...state,
        ingredient: initialState.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};
