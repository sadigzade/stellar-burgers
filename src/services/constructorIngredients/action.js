import { v4 as uuid } from "uuid";
import { ingredientMinusCount, ingredientPlusCount } from "../burgerIngredients/action";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INDGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_UPDATE,
} from "../constants";

export const constructorAddBun = (item) => {
  return {
    type: CONSTRUCTOR_ADD_BUN,
    item,
  };
};

export const constructorAddIngredient = (item) => (dispatch) => {
  dispatch({
    type: CONSTRUCTOR_ADD_INDGREDIENT,
    item,
    dragId: uuid(),
  });
  dispatch(ingredientPlusCount(item._id));
};

export const constructorRemoveIngredient = (dragId, ingredientId) => (dispatch) => {
  dispatch({
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    index: dragId,
  });
  dispatch(ingredientMinusCount(ingredientId));
};

export const constructorUpdate = (newList) => {
  return {
    type: CONSTRUCTOR_UPDATE,
    newList,
  };
};

export const constructorReset = () => {
  return {
    type: CONSTRUCTOR_RESET,
  };
};
