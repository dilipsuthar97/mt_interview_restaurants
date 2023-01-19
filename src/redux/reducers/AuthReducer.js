import {Login} from '../actions/AuthAction';

export const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Login.REQUEST:
      return {
        ...state,
        isLoginSuccess: null,
        error: null,
      };
    case Login.SUCCESS:
      return {
        ...state,
        isLoginSuccess: true,
        isAuthenticated: true,
        data: action.payload,
      };
    case Login.FAILED:
      return {
        ...state,
        isLoginSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const authSelector = state => state.auth;
