import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_MYINFO_SUCCESS,
  FETCH_MYINFO_FAILURE,
} from '../types/auth';

const INITIAL_STATE = () => ({
  token: process.env.BROWSER ? localStorage.getItem('token') : null,
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
  case FETCH_MYINFO_SUCCESS:
    return {
      ...state,
      user: { ...payload },
    };
  case FETCH_MYINFO_FAILURE:
    return {
      ...state,
      error,
    };
  default:
    return state;
  }
};
