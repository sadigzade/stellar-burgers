import { setCookie } from "../../../utils/cookie";
import { LoginActions } from "../../actions/login";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_STATE_RESET,
  LOGOUT_REQUEST_ERROR,
} from "../../constants/login";
import { TRequestData, TUser } from "../../types/data";

type LoginState = {
  loading: boolean;
  error: TRequestData | null;
  user: TUser | null;
};

const initialState: LoginState = {
  loading: false,
  error: null,
  user: null,
};

export const loginReducer = (state = initialState, action: LoginActions): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
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
    case LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case LOGIN_STATE_RESET: {
      return initialState;
    }
    case LOGOUT_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
