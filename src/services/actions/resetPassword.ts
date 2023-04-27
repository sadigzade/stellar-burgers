import { request } from "../../utils/request";
import {
  RESET_PASSWORD_INITIAL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST_SUCCESS,
} from "../constants/resetPassword";
import type { AppDispatch, AppThunk } from "../types";
import type { TForm, TRequestData } from "../types/data";

type ResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
type ResetPasswordRequestSuccessAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
  readonly data: TRequestData;
};
type ResetPasswordRequestErrorAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST_ERROR;
  readonly error: TRequestData;
};
type ResetPasswordInitialAction = {
  readonly type: typeof RESET_PASSWORD_INITIAL;
};

export type ResetPasswordActions =
  | ResetPasswordRequestAction
  | ResetPasswordRequestSuccessAction
  | ResetPasswordRequestErrorAction
  | ResetPasswordInitialAction;

const resetPasswordRequest = (): ResetPasswordRequestAction => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

const resetPasswordRequestSuccess = (data: TRequestData): ResetPasswordRequestSuccessAction => {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
    data,
  };
};

const resetPasswordRequestError = (error: TRequestData): ResetPasswordRequestErrorAction => {
  return {
    type: RESET_PASSWORD_REQUEST_ERROR,
    error,
  };
};

export const resetPasswordInitial = (): ResetPasswordInitialAction => {
  return {
    type: RESET_PASSWORD_INITIAL,
  };
};

export const resetPasswordRequestAsync: AppThunk =
  (form: TForm) => async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());

    try {
      const data = await request("/password-reset/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      dispatch(resetPasswordRequestSuccess(data));
    } catch (error: any) {
      dispatch(resetPasswordRequestError(error));
    }
  };
