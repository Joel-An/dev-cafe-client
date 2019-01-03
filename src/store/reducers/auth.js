import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_USERINFO_FULFILLED,
  FETCH_USERINFO_REJECTED,
} from '../types/auth';

const INITIAL_STATE = () => ({
  token: localStorage.getItem('token'),
  user: { _id: null, profileName: null },
  showError: false,
  error: null,
});

export default (state = INITIAL_STATE(), { type, payload, error }) => {
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
      ...INITIAL_STATE(),
    };
  case LOGOUT_ERROR:
    return {
      ...state,
      showError: true,
      error,
    };
  case FETCH_USERINFO_FULFILLED:
    return {
      ...state,
      user: { ...payload },
    };
  case FETCH_USERINFO_REJECTED:
    return {
      ...state,
      showError: true,
      error,
    };
  default:
    return state;
  }
};
