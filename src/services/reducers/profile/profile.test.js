import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_ERROR,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_STATE_RESET,
} from "../../constants/profile";
import { profileReducer } from "./profile";

describe("profile reducer", () => {
  const data = {
    success: true,
    user: {
      email: "sadigzade.hi@yandex.ru",
      name: "Khikmet Sadigzade",
    },
  };

  it("should return the initial state", () => {
    expect(profileReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      user: null,
    });
  });

  it("should handle PROFILE_REQUEST", () => {
    expect(
      profileReducer(
        {
          loading: false,
          error: null,
          user: null,
        },
        {
          type: PROFILE_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
      user: null,
    });
  });

  it("should handle PROFILE_REQUEST_SUCCESS", () => {
    expect(
      profileReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: PROFILE_REQUEST_SUCCESS,
          data,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      user: data.user,
    });
  });

  it("should handle PROFILE_REQUEST_ERROR", () => {
    const error = {
      success: false,
      message: "Fatal error",
    };

    expect(
      profileReducer(
        {
          loading: true,
          error: null,
          user: null,
        },
        {
          type: PROFILE_REQUEST_ERROR,
          error,
        },
      ),
    ).toEqual({
      loading: false,
      error,
      user: null,
    });
  });

  it("should handle PROFILE_STATE_RESET", () => {
    expect(
      profileReducer(
        {
          loading: false,
          error: null,
          user: data.user,
        },
        {
          type: PROFILE_STATE_RESET,
        },
      ),
    ).toEqual({
      loading: false,
      error: null,
      user: null,
    });
  });
});
