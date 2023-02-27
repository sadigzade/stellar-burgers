import { v4 as uuid } from "uuid";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_UPDATE,
} from "../actions/constants";

const initialState = {
  bun: {},
  ingredients: [],
  totalPrice: 0,
};

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: action.item,
        totalPrice:
          state.totalPrice -
          2 * (state.bun.price === undefined ? 0 : state.bun.price) +
          2 * action.item.price,
      };
    }
    case CONSTRUCTOR_ADD_INDGREDIENT: {
      const newIngredient = {
        dragId: uuid(),
        ...action.item,
      };

      return {
        ...state,
        ingredients: [...state.ingredients, newIngredient],
        totalPrice: state.totalPrice + action.item.price,
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.dragId !== action.index),
        totalPrice:
          state.totalPrice - state.ingredients.find((item) => item.dragId === action.index).price,
      };
    }
    case CONSTRUCTOR_UPDATE: {
      return {
        ...state,
        ingredients: action.optional,
      };
    }
    default: {
      return state;
    }
  }
};
