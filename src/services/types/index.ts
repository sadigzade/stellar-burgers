import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  WsActions,
  LoginActions,
  TokenActions,
  SignupActions,
  ProfileActions,
  OrderModalActions,
  ResetPasswordActions,
  ForgotPasswordActions,
  IngredientModalActions,
  BurgerIngredientActions,
  ConstructorIngredientsActions,
} from "../actions";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | ConstructorIngredientsActions
  | BurgerIngredientActions
  | IngredientModalActions
  | ForgotPasswordActions
  | ResetPasswordActions
  | OrderModalActions
  | ProfileActions
  | SignupActions
  | TokenActions
  | LoginActions
  | WsActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
