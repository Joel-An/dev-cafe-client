import {
  put, take, call, fork, cancel,
} from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from '../types/auth';
import * as actions from '../actions/auth';
import * as api from '../../api/auth';

function* authorize(loginForm) {
  try {
    const token = yield call(api.login, loginForm);
    yield put(actions.loginSucceeded(token));
    yield call(api.storeToken, token);
  } catch (error) {
    yield put(actions.loginFailed(error));
  }
}

function* loginFlow() {
  let loginTask;
  while (true) {
    const loginAction = yield take(LOGIN_REQUEST);

    if (loginTask) {
      yield cancel(loginTask);
    }

    loginTask = yield fork(authorize, loginAction.payload);

    const action = yield take(LOGOUT_REQUEST);

    if (action.type === LOGOUT_REQUEST) {
      yield cancel(loginTask);
    }
  }
}

function* requestLogout(token) {
  try {
    yield call(api.logout, token);
    yield put(actions.logoutSucceeded());
    yield call(api.clearToken);
  } catch (error) {
    yield put(actions.logoutFailed(error));
  }
}

function* logoutFlow() {
  let logoutTask;
  while (true) {
    const logoutAction = yield take(LOGOUT_REQUEST);

    if (logoutTask) {
      yield cancel(logoutTask);
    }

    logoutTask = yield fork(requestLogout, logoutAction.payload);
  }
}

export default { loginFlow, logoutFlow };
