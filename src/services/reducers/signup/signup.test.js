import {
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_ERROR,
  SIGN_UP_REQUEST_SUCCESS,
} from "../../constants/signup";
import { signupReducer } from "./signup";

describe("signup reducer", () => {
  const data = {
    success: true,
    user: {
      email: "sadigzade.hi@yandex.ru",
      name: "Khikmet Sadigzade",
    },
    accessToken: "Bearer 321",
    refreshToken: "123",
  };
  const error = {
    success: false,
    message: "Fatal error",
  };

  it("should return the initial state", () => {
    expect(signupReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      user: null,
    });
  });

  it("should handle SIGN_UP_REQUEST", () => {
    expect(
      signupReducer(
        {
          loading: false,
          error: null,
          user: null,
        },
        {
          type: SIGN_UP_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
      user: null,
    });
  });

  it("should handle SIGN_UP_REQUEST_SUCCESS", () => {
    expect(
      signupReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: SIGN_UP_REQUEST_SUCCESS,
          data,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      user: data.user,
    });
  });

  it("should handle SIGN_UP_REQUEST_ERROR", () => {
    expect(
      signupReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: SIGN_UP_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      loading: false,
      error,
      user: null,
    });
  });
});
