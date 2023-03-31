import { request } from "../../utils/request";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_ERROR,
  SIGN_UP_REQUEST_SUCCESS,
} from "../constants/signup";
import type { AppDispatch, AppThunk } from "../types";
import type { TForm, TRegister, TRequestData } from "../types/data";

type SignupRequestAction = {
  readonly type: typeof SIGN_UP_REQUEST;
};
type SignupRequestSuccessAction = {
  readonly type: typeof SIGN_UP_REQUEST_SUCCESS;
  readonly data: Readonly<TRegister>;
};
type SignupRequestErrorAction = {
  readonly type: typeof SIGN_UP_REQUEST_ERROR;
  readonly error: Readonly<TRequestData>;
};

export type SignupActions =
  | SignupRequestAction
  | SignupRequestSuccessAction
  | SignupRequestErrorAction;

const signupRequest = (): SignupRequestAction => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signupRequestSuccess = (data: Readonly<TRegister>): SignupRequestSuccessAction => {
  return {
    type: SIGN_UP_REQUEST_SUCCESS,
    data,
  };
};

const signupRequestError = (error: Readonly<TRequestData>): SignupRequestErrorAction => {
  return {
    type: SIGN_UP_REQUEST_ERROR,
    error,
  };
};

export const signupRequestAsync: AppThunk = (form: TForm) => async (dispatch: AppDispatch) => {
  dispatch(signupRequest());

  try {
    const data = await request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    dispatch(signupRequestSuccess(data));
  } catch (error: any) {
    dispatch(signupRequestError(error));
  }
};
