import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_MYINFO_REQUEST,
  FETCH_MYINFO_SUCCESS,
  FETCH_MYINFO_FAILURE,
  FETCH_MY_NOTIFICATIONS_REQUEST,
  FETCH_MY_NOTIFICATIONS_SUCCESS,
  FETCH_MY_NOTIFICATIONS_FAILURE,
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

export const fetchMyInfo = token => ({
  type: FETCH_MYINFO_REQUEST,
  payload: token,
});

export const fetchMyInfoSuccess = user => ({
  type: FETCH_MYINFO_SUCCESS,
  payload: user,
});

export const fetchMyInfoFailure = error => ({
  type: FETCH_MYINFO_FAILURE,
  error,
});

export const fetchMyNotifications = token => ({
  type: FETCH_MY_NOTIFICATIONS_REQUEST,
  payload: token,
});

export const fetchMyNotificationsSuccess = myNotifications => ({
  type: FETCH_MY_NOTIFICATIONS_SUCCESS,
  payload: myNotifications,
});

export const fetchMyNotificationsFailure = error => ({
  type: FETCH_MY_NOTIFICATIONS_FAILURE,
  error,
});
