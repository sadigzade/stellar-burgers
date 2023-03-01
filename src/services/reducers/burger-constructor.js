import { v4 as uuid } from "uuid";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_UPDATE,
} from "../actions/constants";

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
        dragId: uuid(),
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
      const dragCard = state.ingredients[action.dragIndex];
      const newCards = [...state.ingredients];
      newCards.splice(action.dragIndex, 1);
      newCards.splice(action.hoverIndex, 0, dragCard);

      return {
        ...state,
        ingredients: newCards,
      };
    }
    default: {
      return state;
    }
  }
};
