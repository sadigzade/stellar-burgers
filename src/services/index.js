import { combineReducers } from "redux";

import { burgerIngredientsReducer } from "./burgerIngredients/reducer";
import { constructorIngredientsReducer } from "./constructorIngredients/reducer";
import { forgotPasswordReducer } from "./forgotPassword/reducer";
import { ingredientModalReducer } from "./ingredientModal/reducer";
import { loginReducer } from "./login/reducer";
import { orderModalReducer } from "./orderModal/reducer";
import { profileReducer } from "./profile/reducer";
import { resetPasswordReducer } from "./resetPassword/reducer";
import { signupReducer } from "./signup/reducer";
import { updateTokenReducer } from "./token/reducer";

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
  token: updateTokenReducer,
});
