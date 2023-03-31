import { request } from "../../utils/request";
import { ingredientsCountReset } from "./burgerIngredients";
import { constructorReset } from "./constructorIngredients";
import {
  ORDER_NUMBER_REQUEST_ERROR,
  ORDER_NUMBER_REQUEST_SUCCESS,
  ORDER_NUMBER_RESET,
} from "../constants/orderModal";
import type { TOrder, TRequestData } from "../types/data";
import type { AppDispatch, AppThunk } from "../types";

type OrderNumberRequestSuccessAction = {
  readonly type: typeof ORDER_NUMBER_REQUEST_SUCCESS;
  readonly number: TOrder;
};
type OrderNumberRequestErrorAction = {
  readonly type: typeof ORDER_NUMBER_REQUEST_ERROR;
  readonly error: TRequestData;
};
type OrderNumberResetAction = {
  readonly type: typeof ORDER_NUMBER_RESET;
};

export type OrderModalActions =
  | OrderNumberRequestSuccessAction
  | OrderNumberRequestErrorAction
  | OrderNumberResetAction;

const orderNumberRequestSuccess = (number: TOrder): OrderNumberRequestSuccessAction => {
  return {
    type: ORDER_NUMBER_REQUEST_SUCCESS,
    number,
  };
};

const orderNumberRequestError = (error: TRequestData): OrderNumberRequestErrorAction => {
  return {
    type: ORDER_NUMBER_REQUEST_ERROR,
    error,
  };
};

export const orderNumberReset = (): OrderNumberResetAction => {
  return {
    type: ORDER_NUMBER_RESET,
  };
};

export const orderNumberRequestAsync: AppThunk =
  (ingredientsId: string[]) => async (dispatch: AppDispatch) => {
    try {
      const data = await request("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsId,
        }),
      });

      dispatch(orderNumberRequestSuccess(data.order));
      dispatch(constructorReset());
      dispatch(ingredientsCountReset());
    } catch (error: any) {
      dispatch(orderNumberRequestError(error));
    }
  };
