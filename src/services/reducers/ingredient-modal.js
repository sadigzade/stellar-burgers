import { INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN } from "../actions/constants";

const initialState = {
  ingredient: null,
};

export const ingredientModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_MODAL_OPEN: {
      return {
        ...state,
        isOpen: true,
        ingredient: action.ingredient,
      };
    }
    case INGREDIENT_MODAL_CLOSE: {
      return {
        ...state,
        isOpen: false,
        ingredient: initialState.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};
