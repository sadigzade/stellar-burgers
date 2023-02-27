import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { constructorIngredientsReducer } from "./burger-constructor";
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  ingredientModal: ingredientModalReducer,
  orderModal: orderModalReducer,
});
