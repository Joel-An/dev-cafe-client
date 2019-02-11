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
  error: null,
});

export default (state = INITIAL_STATE(), { type, payload, error }) => {
  switch (type) {
  case LOGIN_SUCCESS:
    localStorage.setItem('token', payload);
    return {
      ...state,
      token: localStorage.getItem('token'),
      error: null,
    };
  case LOGIN_ERROR:
    return {
      ...state,
      error,
    };
  case LOGOUT_SUCCESS:
    localStorage.removeItem('token');
    return {
      ...INITIAL_STATE(),
    };
  case LOGOUT_ERROR:
    return {
      ...state,
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
      error,
    };
  default:
    return state;
  }
};
