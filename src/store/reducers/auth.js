import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../types/auth';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  showError: false,
  error: null,
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      token: payload,
      showError: false,
      error: null,
    };
  case LOGIN_ERROR:
    return {
      ...state,
      showError: true,
      error,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      token: null,
      showError: false,
      error: null,
    };
  case LOGOUT_ERROR:
    return {
      ...state,
      showError: true,
      error,
    };
  default:
    return state;
  }
};
