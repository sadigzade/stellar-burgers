import { ProfileActions } from "../actions/profile";
import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_ERROR,
  PROFILE_STATE_RESET,
  PROFILE_REQUEST_SUCCESS,
} from "../constants/profile";
import { TRequestData, TUser } from "../types/data";

type ProfileState = {
  loading: boolean;
  error: Readonly<TRequestData> | null;
  user: Readonly<TUser> | null;
};

const initialState: ProfileState = {
  loading: false,
  error: null,
  user: null,
};

export const profileReducer = (state = initialState, action: ProfileActions): ProfileState => {
  switch (action.type) {
    case PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PROFILE_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case PROFILE_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case PROFILE_STATE_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
