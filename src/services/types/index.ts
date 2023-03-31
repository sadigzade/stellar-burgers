import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  BurgerIngredientActions,
  ConstructorIngredientsActions,
  ForgotPasswordActions,
  IngredientModalActions,
  LoginActions,
  OrderModalActions,
  ProfileActions,
  ResetPasswordActions,
  SignupActions,
  TokenActions,
} from "../actions";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | BurgerIngredientActions
  | ConstructorIngredientsActions
  | ForgotPasswordActions
  | IngredientModalActions
  | LoginActions
  | OrderModalActions
  | ProfileActions
  | ResetPasswordActions
  | SignupActions
  | TokenActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
