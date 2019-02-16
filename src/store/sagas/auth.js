import {
  put, call, takeLatest,
} from 'redux-saga/effects';

import {
  LOGOUT_REQUEST,
  FETCH_USERINFO,
} from '../types/auth';
import * as actions from '../actions/auth';
import * as api from '../../api/auth';

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

const watchFetchUserInfo = takeLatest(FETCH_USERINFO, fetchUserInfo);

const authSagas = [
  watchLogout,
  watchFetchUserInfo,
];

export default authSagas;
