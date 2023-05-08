import { combineReducers } from "redux";

import { loginReducer } from "./login/login";
import { tokenReducer } from "./token/token";
import { wsReducer } from "./ws-reducer/wsReducer";
import { signupReducer } from "./signup/signup";
import { profileReducer } from "./profile/profile";
import { orderModalReducer } from "./order-modal/orderModal";
import { resetPasswordReducer } from "./reset-password/resetPassword";
import { forgotPasswordReducer } from "./forgot-password/forgotPassword";
import { ingredientModalReducer } from "./ingredient-modal/ingredientModal";
import { burgerIngredientsReducer } from "./burger-ingredients/burgerIngredients";
import { constructorIngredientsReducer } from "./constructor-ingredients/constructorIngredients";

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
