import { getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";
import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_ERROR,
  PROFILE_STATE_RESET,
  PROFILE_REQUEST_SUCCESS,
} from "../constants/profile";
import { GET_PROFILE, UPDATE_PROFILE } from "../constants/token";
import type { AppDispatch, AppThunk } from "../types";
import type { TForm, TProfile, TRequestData } from "../types/data";
import { tokenRequestThunk } from "./token";

type ProfileRequestAction = {
  readonly type: typeof PROFILE_REQUEST;
};
type ProfileRequestSuccessAction = {
  readonly type: typeof PROFILE_REQUEST_SUCCESS;
  readonly data: Readonly<TProfile>;
};
type ProfileRequestErrorAction = {
  readonly type: typeof PROFILE_REQUEST_ERROR;
  readonly error: TRequestData;
};
type ProfileStateResetAction = {
  readonly type: typeof PROFILE_STATE_RESET;
};

export type ProfileActions =
  | ProfileRequestAction
  | ProfileRequestSuccessAction
  | ProfileRequestErrorAction
  | ProfileStateResetAction;

export const profileRequest = (): ProfileRequestAction => {
  return {
    type: PROFILE_REQUEST,
  };
};

export const profileRequestSuccess = (data: Readonly<TProfile>): ProfileRequestSuccessAction => {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    data,
  };
};

export const profileRequestError = (error: TRequestData): ProfileRequestErrorAction => {
  return {
    type: PROFILE_REQUEST_ERROR,
    error,
  };
};

export const profileStateReset = (): ProfileStateResetAction => {
  return {
    type: PROFILE_STATE_RESET,
  };
};

export const profileRequestAsync: AppThunk = () => async (dispatch: AppDispatch | AppThunk) => {
  dispatch(profileRequest());

  try {
    const data = await request("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });

    dispatch(profileRequestSuccess(data));
  } catch (error: any) {
    dispatch(profileRequestError(error));

    if (error.message === "jwt expired") {
      const options = { type: GET_PROFILE };
      dispatch(tokenRequestThunk(options));
    }
  }
};

export const profileRequestUpdate: AppThunk =
  (form: TForm) => async (dispatch: AppDispatch | AppThunk) => {
    dispatch(profileRequest());

    try {
      const data = await request("/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify(form),
      });

      dispatch(profileRequestSuccess(data));
    } catch (error: any) {
      dispatch(profileRequestError(error));

      if (error.message === "jwt expired") {
        const options = { type: UPDATE_PROFILE, form };
        dispatch(tokenRequestThunk(options));
      }
    }
  };

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  if (getCookie("accessToken")) {
    dispatch(profileRequestAsync());
  }
};
