import { request } from "../../utils/request";
import {
  INGREDIENTS_COUNT_RESET,
  INGREDIENTS_MINUS_COUNT,
  INGREDIENTS_PLUS_COUNT,
  INGREDIENTS_REQUEST_ERROR,
  INGREDIENTS_REQUEST_SUCCESS,
} from "../constants/burgerIngredients";
import type { AppDispatch, AppThunk } from "../types";
import type { TBurgerIngredients, TRequestData } from "../types/data";

type IngredientsRequestSuccessAction = {
  readonly type: typeof INGREDIENTS_REQUEST_SUCCESS;
  readonly ingredients: TBurgerIngredients[];
};
type IngredientsRequestErrorAction = {
  readonly type: typeof INGREDIENTS_REQUEST_ERROR;
  readonly error: Readonly<TRequestData>;
};
type IngredientsCountResetAction = {
  readonly type: typeof INGREDIENTS_COUNT_RESET;
};
type IngredientPlusCountAction = {
  readonly type: typeof INGREDIENTS_PLUS_COUNT;
  readonly ingredientId: string;
};
type IngredientMinusCountAction = {
  readonly type: typeof INGREDIENTS_MINUS_COUNT;
  readonly ingredientId: string;
};

export type BurgerIngredientActions =
  | IngredientsRequestSuccessAction
  | IngredientsRequestErrorAction
  | IngredientsCountResetAction
  | IngredientPlusCountAction
  | IngredientMinusCountAction;

const ingredientsRequestSuccess = (data: TBurgerIngredients[]): IngredientsRequestSuccessAction => {
  return {
    type: INGREDIENTS_REQUEST_SUCCESS,
    ingredients: data,
  };
};

const ingredientsRequestError = (error: TRequestData): IngredientsRequestErrorAction => {
  return {
    type: INGREDIENTS_REQUEST_ERROR,
    error,
  };
};

export const ingredientsCountReset = (): IngredientsCountResetAction => {
  return {
    type: INGREDIENTS_COUNT_RESET,
  };
};

export const ingredientPlusCount = (ingredientId: string): IngredientPlusCountAction => {
  return {
    type: INGREDIENTS_PLUS_COUNT,
    ingredientId,
  };
};

export const ingredientMinusCount = (ingredientId: string): IngredientMinusCountAction => {
  return {
    type: INGREDIENTS_MINUS_COUNT,
    ingredientId,
  };
};

export const ingredientsRequestAsync: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    const data = await request("/ingredients");
    dispatch(ingredientsRequestSuccess(data.data));
  } catch (error: any) {
    dispatch(ingredientsRequestError(error));
  }
};
