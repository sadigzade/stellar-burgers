import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_UPDATE,
} from "../constants";

const initialState = {
  bun: null,
  ingredients: [],
};

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: action.item,
      };
    }
    case CONSTRUCTOR_ADD_INDGREDIENT: {
      const newIngredient = {
        dragId: action.dragId,
        ...action.item,
      };

      return {
        ...state,
        ingredients: [...state.ingredients, newIngredient],
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.dragId !== action.index),
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
