import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_USERINFO,
  FETCH_USERINFO_FULFILLED,
  FETCH_USERINFO_REJECTED,
} from '../types/auth';

export const login = loginForm => ({
  type: LOGIN_REQUEST,
  payload: loginForm,
});

export const loginSucceeded = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailed = error => ({
  type: LOGIN_ERROR,
  error,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSucceeded = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailed = error => ({
  type: LOGOUT_ERROR,
  error,
});

export const fetchUserInfo = token => ({
  type: FETCH_USERINFO,
  payload: token,
});

export const fetchUserInfoFulfilled = user => ({
  type: FETCH_USERINFO_FULFILLED,
  payload: user,
});

export const fetchUserInfoRejected = error => ({
  type: FETCH_USERINFO_REJECTED,
  error,
});
