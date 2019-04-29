import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FETCH_MYINFO_SUCCESS,
  FETCH_MYINFO_FAILURE,
  FETCH_MY_NOTIFICATIONS_SUCCESS,
} from '../types/auth';

const INITIAL_STATE = () => ({
  token: null,
  myId: null,
  myNotifications: [],
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
  case FETCH_MY_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      myNotifications: payload,
    };
  default:
    return state;
  }
};
