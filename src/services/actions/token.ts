import { getCookie } from "../../utils/cookie";
import { request } from "../../utils/request";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  TOKEN_REQUEST_ERROR,
  TOKEN_REQUEST_SUCCESS,
} from "../constants/token";
import type { AppDispatch, AppThunk } from "../types";
import type { TOptions, TRequestData, TToken } from "../types/data";
import { profileRequestAsync, profileRequestUpdate } from "./profile";

type TokenRequestSuccessAction = {
  readonly type: typeof TOKEN_REQUEST_SUCCESS;
  readonly data: Readonly<TToken>;
};
type TokenRequestErrorAction = {
  readonly type: typeof TOKEN_REQUEST_ERROR;
  readonly error: Readonly<TRequestData>;
};

export type TokenActions = TokenRequestSuccessAction | TokenRequestErrorAction;

export const tokenRequestSuccess = (data: Readonly<TToken>): TokenRequestSuccessAction => {
  return {
    type: TOKEN_REQUEST_SUCCESS,
    data,
  };
};

export const tokenRequestError = (error: Readonly<TRequestData>): TokenRequestErrorAction => {
  return {
    type: TOKEN_REQUEST_ERROR,
    error,
  };
};

export const tokenRequestThunk: AppThunk =
  (options: TOptions) => async (dispatch: AppDispatch | AppThunk) => {
    try {
      const data = await request("/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("refreshToken"),
        }),
      });

      dispatch(tokenRequestSuccess(data));

      switch (options.type) {
        case GET_PROFILE: {
          dispatch(profileRequestAsync());
          break;
        }
        case UPDATE_PROFILE: {
          dispatch(profileRequestUpdate(options.form));
          break;
        }
        default: {
          break;
        }
      }
    } catch (error: any) {
      dispatch(tokenRequestError(error));
    }
  };
