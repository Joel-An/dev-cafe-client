import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
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
