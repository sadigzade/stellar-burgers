import { request } from "../../utils/request";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_ERROR,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_RESET,
} from "../constants/forgotPassword";
import type { AppDispatch, AppThunk } from "../types";
import type { TForm, TRequestData } from "../types/data";

type ForgotPasswordRequestAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};
type ForgotPasswordRequestSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
  readonly data: TRequestData;
};
type ForgotPasswordRequestErrorAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_ERROR;
  readonly error: TRequestData;
};
type ForgotPasswordResetAction = {
  readonly type: typeof FORGOT_PASSWORD_RESET;
};

export type ForgotPasswordActions =
  | ForgotPasswordRequestAction
  | ForgotPasswordRequestSuccessAction
  | ForgotPasswordRequestErrorAction
  | ForgotPasswordResetAction;

const forgotPasswordRequest = (): ForgotPasswordRequestAction => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

const forgotPasswordRequestSuccess = (data: TRequestData): ForgotPasswordRequestSuccessAction => {
  return {
    type: FORGOT_PASSWORD_REQUEST_SUCCESS,
    data,
  };
};

const forgotPasswordRequestError = (error: TRequestData): ForgotPasswordRequestErrorAction => {
  return {
    type: FORGOT_PASSWORD_REQUEST_ERROR,
    error,
  };
};

export const forgotPasswordReset = (): ForgotPasswordResetAction => {
  return {
    type: FORGOT_PASSWORD_RESET,
  };
};

export const forgotPasswordRequestThunk: AppThunk =
  (form: TForm) => async (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const data = await request("/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      dispatch(forgotPasswordRequestSuccess(data));
    } catch (error: any) {
      dispatch(forgotPasswordRequestError(error));
    }
  };
