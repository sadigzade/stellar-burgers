import { deleteCookie, getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_STATE_RESET,
  LOGOUT_REQUEST_ERROR,
} from "../constants/login";
import type { AppDispatch, AppThunk } from "../types";
import type { TForm, TLogin, TRequestData } from "../types/data";
import { checkUserAuth, profileStateReset } from "./profile";

type LoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};
type LoginRequestSuccessAction = {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
  readonly data: Readonly<TLogin>;
};
type LoginRequestErrorAction = {
  readonly type: typeof LOGIN_REQUEST_ERROR;
  readonly error: TRequestData;
};
type LogoutRequestErrorAction = {
  readonly type: typeof LOGOUT_REQUEST_ERROR;
  readonly error: TRequestData;
};
type LoginStateResetAction = {
  readonly type: typeof LOGIN_STATE_RESET;
};

export type LoginActions =
  | LoginRequestAction
  | LoginRequestSuccessAction
  | LoginRequestErrorAction
  | LogoutRequestErrorAction
  | LoginStateResetAction;

const loginRequest = (): LoginRequestAction => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginRequestSuccess = (data: Readonly<TLogin>): LoginRequestSuccessAction => {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    data,
  };
};

const loginRequestError = (error: TRequestData): LoginRequestErrorAction => {
  return {
    type: LOGIN_REQUEST_ERROR,
    error,
  };
};

const logoutRequestError = (error: TRequestData): LogoutRequestErrorAction => {
  return {
    type: LOGOUT_REQUEST_ERROR,
    error,
  };
};

export const loginStateReset = (): LoginStateResetAction => {
  return {
    type: LOGIN_STATE_RESET,
  };
};

export const loginRequestThunk: AppThunk =
  (form: TForm) => async (dispatch: AppDispatch | AppThunk) => {
    dispatch(loginRequest());

    try {
      const data = await request("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      dispatch(loginRequestSuccess(data));
      dispatch(checkUserAuth());
    } catch (error: any) {
      dispatch(loginRequestError(error));
    }
  };

export const logoutRequestThunk: AppThunk = () => async (dispatch: AppDispatch, getState) => {
  try {
    await request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });

    dispatch(loginStateReset());
    dispatch(profileStateReset());
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  } catch (error: any) {
    dispatch(logoutRequestError(error));
  }
};
