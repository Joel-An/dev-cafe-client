import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';

import {
  LOGOUT_REQUEST,
  FETCH_MYINFO_REQUEST,
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
    yield put(actions.fetchUserInfoFulfilled(user));
  } catch (error) {
    yield put(actions.fetchUserInfoRejected(error));
    yield put(actions.logout(token));
  }
}

const watchFetchUserInfo = takeLatest(FETCH_MYINFO_REQUEST, fetchUserInfo);

function* autoLogin() {
  if (!process.env.BROWSER) {
    return;
  }
  const token = yield select(selectToken);

  if (token) {
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
  autoLogin(),
];

export default authSagas;
