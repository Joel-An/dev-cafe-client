import {
  put, take, call, fork, cancel, takeLatest,
} from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  FETCH_USERINFO,
} from '../types/auth';
import * as actions from '../actions/auth';
import * as api from '../../api/auth';

import { closePopup } from '../actions/popups';
import { LOGIN_POPUP } from '../types/popups';

function* authorize(loginAction) {
  try {
    const token = yield call(api.login, loginAction.payload);
    yield put(actions.loginSucceeded(token));
    yield put(closePopup(LOGIN_POPUP));
  } catch (error) {
    yield put(actions.loginFailed(error));
  }
}

function* loginFlow() {
  yield takeLatest(LOGIN_REQUEST, authorize);
}

function* requestLogout(logoutAction) {
  try {
    yield call(api.logout, logoutAction.payload);
    yield put(actions.logoutSucceeded());
  } catch (error) {
    yield put(actions.logoutFailed(error));
  }
}

function* logoutFlow() {
  yield takeLatest(LOGOUT_REQUEST, requestLogout);
}

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

function* watchFetchUserInfo() {
  yield takeLatest(FETCH_USERINFO, fetchUserInfo);
}

export default { loginFlow, logoutFlow, watchFetchUserInfo };
