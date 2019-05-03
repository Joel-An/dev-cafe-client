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
  NEW_NOTIFICATION,
  FETCH_NEW_NOTIFICATIONS_REQUEST,
  FETCH_NEW_NOTIFICATIONS_SUCCESS,
  FETCH_NEW_NOTIFICATIONS_FAILURE,
  FETCH_OLD_NOTIFICATIONS_REQUEST,
  FETCH_OLD_NOTIFICATIONS_SUCCESS,
  FETCH_OLD_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATION_CHECK_TIME_REQUEST,
  FETCH_NOTIFICATION_CHECK_TIME_SUCCESS,
  FETCH_NOTIFICATION_CHECK_TIME_FAILURE,
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

export const newNotification = notification => ({
  type: NEW_NOTIFICATION,
  payload: notification,
});

export const fetchNewNotifications = token => ({
  type: FETCH_NEW_NOTIFICATIONS_REQUEST,
  payload: token,
});

export const fetchNewNotificationsSuccess = notifications => ({
  type: FETCH_NEW_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

export const fetchNewNotificationsFailure = error => ({
  type: FETCH_NEW_NOTIFICATIONS_FAILURE,
  error,
});

export const fetchOldNotifications = token => ({
  type: FETCH_OLD_NOTIFICATIONS_REQUEST,
  payload: token,
});

export const fetchOldNotificationsSuccess = notifications => ({
  type: FETCH_OLD_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});

export const fetchOldNotificationsFailure = error => ({
  type: FETCH_OLD_NOTIFICATIONS_FAILURE,
  error,
});

export const fetchNotoficationCheckTime = token => ({
  type: FETCH_NOTIFICATION_CHECK_TIME_REQUEST,
  payload: token,
});

export const fetchNotoficationCheckTimeSuccess = time => ({
  type: FETCH_NOTIFICATION_CHECK_TIME_SUCCESS,
  payload: time,
});

export const fetchNotoficationCheckTimeFailure = error => ({
  type: FETCH_NOTIFICATION_CHECK_TIME_FAILURE,
  error,
});
