import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';

import {
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  FETCH_MYINFO_REQUEST,
  FETCH_MY_NOTIFICATIONS_REQUEST,
} from '../types/auth';
import * as actions from '../actions/auth';
import * as api from '../../api/auth';
import { selectToken } from '../selectors/auth';

function* requestLogout(logoutAction) {
  try {
    yield call(api.logout, logoutAction.payload);
    yield put(actions.logoutSucceeded());
  } catch (error) {
    yield put(actions.logoutFailed(error));
  }
}

const watchLogout = takeLatest(LOGOUT_REQUEST, requestLogout);

function* fetchUserInfo(action) {
  const token = action.payload;
  try {
    const user = yield call(api.fetchUserInfo, token);
    yield put(actions.fetchMyInfoSuccess(user));
  } catch (error) {
    yield put(actions.fetchMyInfoFailure(error));
    yield put(actions.logout(token));
  }
}

const watchFetchUserInfo = takeLatest(FETCH_MYINFO_REQUEST, fetchUserInfo);

function* fetchMyNotifications(action) {
  const token = action.payload;
  try {
    const notifications = yield call(api.fetchMyNotifications, token);
    yield put(actions.fetchMyNotificationsSuccess(notifications));
  } catch (error) {
    yield put(actions.fetchMyNotificationsFailure(error));
  }
}

const watchFetchMyNotifications = takeLatest(FETCH_MY_NOTIFICATIONS_REQUEST, fetchMyNotifications);

function* loginSuccessSaga() {
  const token = yield select(selectToken);

  yield put(actions.fetchMyInfo(token));
  yield put(actions.fetchMyNotifications(token));
}

const watchLoginSuccess = takeLatest(LOGIN_SUCCESS, loginSuccessSaga);

function* autoLogin() {
  if (!process.env.BROWSER) {
    return;
  }

  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    yield put(actions.loginSucceeded(storedToken));
  }
}

const authSagas = [
  watchLogout,
  watchFetchUserInfo,
  watchFetchMyNotifications,
  autoLogin(),
  watchLoginSuccess,
];

export default authSagas;
