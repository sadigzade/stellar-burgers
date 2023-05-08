import { ConstructorIngredientsActions } from "../../actions/constructorIngredients";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_UPDATE,
} from "../../constants/constructorIngredients";
import { TBurgerIngredients } from "../../types/data";

type ConstructorIngredientsState = {
  bun: TBurgerIngredients | null;
  ingredients: TBurgerIngredients[];
};

const initialState: ConstructorIngredientsState = {
  bun: null,
  ingredients: [],
};

export const constructorIngredientsReducer = (
  state = initialState,
  action: ConstructorIngredientsActions,
): ConstructorIngredientsState => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: { ...action.item, count: 2 },
      };
    }
    case CONSTRUCTOR_ADD_INDGREDIENT: {
      const newIngredient = {
        ...action.item,
        dragId: action.dragId,
      };

      return {
        ...state,
        ingredients: [...state.ingredients, newIngredient],
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.dragId !== action.dragId),
      };
    }
    case CONSTRUCTOR_UPDATE: {
      return {
        ...state,
        ingredients: action.newList,
      };
    }
    case CONSTRUCTOR_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
