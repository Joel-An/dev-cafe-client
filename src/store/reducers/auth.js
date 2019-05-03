import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_MYINFO_SUCCESS,
  FETCH_MYINFO_FAILURE,
  NEW_NOTIFICATION,
  FETCH_NEW_NOTIFICATIONS_SUCCESS,
  FETCH_OLD_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATION_CHECK_TIME_SUCCESS,
} from '../types/auth';

const INITIAL_STATE = () => ({
  token: null,
  myId: null,
  newNotifications: [],
  oldNotifications: [],
  lastNotificationCheckTime: new Date().toString(),
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
      myId: payload._id,
    };
  case FETCH_MYINFO_FAILURE:
    return {
      ...state,
      error,
    };
  case NEW_NOTIFICATION: {
    const { newNotifications } = state;
    return {
      ...state,
      newNotifications: [payload].concat(newNotifications),
    };
  }
  case FETCH_NEW_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      newNotifications: payload,
    };
  case FETCH_OLD_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      oldNotifications: payload,
    };
  case FETCH_NOTIFICATION_CHECK_TIME_SUCCESS:
    return {
      ...state,
      lastNotificationCheckTime: payload,
    };
  default:
    return state;
  }
};
