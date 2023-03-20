import {
  INGREDIENTS_COUNT_RESET,
  INGREDIENTS_MINUS_COUNT,
  INGREDIENTS_PLUS_COUNT,
  INGREDIENTS_REQUEST_ERROR,
  INGREDIENTS_REQUEST_SUCCESS,
} from "../constants";
import { initialCount } from "../../utils/initial-count";

export const initialState = {
  ingredients: [],
  error: null,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredients: initialCount(action.ingredients),
      };
    }
    case INGREDIENTS_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case INGREDIENTS_COUNT_RESET: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => ({ ...ingredient, count: 0 })),
      };
    }
    case INGREDIENTS_PLUS_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.ingredientId
            ? { ...ingredient, count: ingredient.count + 1 }
            : ingredient,
        ),
      };
    }
    case INGREDIENTS_MINUS_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.ingredientId
            ? { ...ingredient, count: ingredient.count - 1 }
            : ingredient,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
