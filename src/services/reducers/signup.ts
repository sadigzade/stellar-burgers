import { setCookie } from "../../utils/cookie";
import { SignupActions } from "../actions/signup";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_ERROR,
  SIGN_UP_REQUEST_SUCCESS,
} from "../constants/signup";
import { TRequestData, TUser } from "../types/data";

type SignupState = {
  loading: boolean;
  error: Readonly<TRequestData> | null;
  user: Readonly<TUser> | null;
};

const initialState: SignupState = {
  loading: false,
  error: null,
  user: null,
};

export const signupReducer = (state = initialState, action: SignupActions): SignupState => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGN_UP_REQUEST_SUCCESS: {
      const accessToken = action.data.accessToken.split("Bearer ")[1];
      const refreshToken = action.data.refreshToken;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case SIGN_UP_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
