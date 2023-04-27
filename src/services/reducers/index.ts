import { combineReducers } from "redux";

import { loginReducer } from "./login";
import { tokenReducer } from "./token";
import { wsReducer } from "./wsReducer";
import { signupReducer } from "./signup";
import { profileReducer } from "./profile";
import { orderModalReducer } from "./orderModal";
import { resetPasswordReducer } from "./resetPassword";
import { forgotPasswordReducer } from "./forgotPassword";
import { ingredientModalReducer } from "./ingredientModal";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { constructorIngredientsReducer } from "./constructorIngredients";

export const rootReducer = combineReducers({
  login: loginReducer,
  token: tokenReducer,
  webSocket: wsReducer,
  signup: signupReducer,
  profile: profileReducer,
  orderModal: orderModalReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  ingredientModal: ingredientModalReducer,
  burgerIngredients: burgerIngredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
});
