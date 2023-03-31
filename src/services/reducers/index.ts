import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients";
import { constructorIngredientsReducer } from "./constructorIngredients";
import { forgotPasswordReducer } from "./forgotPassword";
import { ingredientModalReducer } from "./ingredientModal";
import { loginReducer } from "./login";
import { orderModalReducer } from "./orderModal";
import { profileReducer } from "./profile";
import { resetPasswordReducer } from "./resetPassword";
import { signupReducer } from "./signup";
import { tokenReducer } from "./token";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  forgotPassword: forgotPasswordReducer,
  ingredientModal: ingredientModalReducer,
  login: loginReducer,
  orderModal: orderModalReducer,
  profile: profileReducer,
  resetPassword: resetPasswordReducer,
  signup: signupReducer,
  token: tokenReducer,
});
