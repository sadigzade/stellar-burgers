import { setCookie } from "../../utils/cookie";
import { TokenActions } from "../actions/token";
import { TOKEN_REQUEST_ERROR, TOKEN_REQUEST_SUCCESS } from "../constants/token";
import { TRequestData } from "../types/data";

type TokenState = {
  error: Readonly<TRequestData> | null;
};

const initialState: TokenState = {
  error: null,
};

export const tokenReducer = (state = initialState, action: TokenActions): TokenState => {
  switch (action.type) {
    case TOKEN_REQUEST_SUCCESS: {
      const accessToken = action.data.accessToken.split("Bearer ")[1];
      const refreshToken = action.data.refreshToken;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      return initialState;
    }
    case TOKEN_REQUEST_ERROR: {
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
