import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';

import {
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  FETCH_MYINFO_REQUEST,
  FETCH_NEW_NOTIFICATIONS_REQUEST,
  FETCH_OLD_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATION_CHECK_TIME_REQUEST,
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
    const myInfo = yield call(api.fetchUserInfo, token);
    yield put(actions.fetchMyInfoSuccess(myInfo));
  } catch (error) {
    yield put(actions.fetchMyInfoFailure(error));
    yield put(actions.logout(token));
  }
}

const watchFetchUserInfo = takeLatest(FETCH_MYINFO_REQUEST, fetchUserInfo);

function* fetchNewNotifications(action) {
  const token = action.payload;
  try {
    const newNotifications = yield call(api.fetchNewNotifications, token);
    yield put(actions.fetchNewNotificationsSuccess(newNotifications));
  } catch (error) {
    yield put(actions.fetchNewNotificationsFailure(error));
  }
}

const watchFetchNewNotifications = takeLatest(
  FETCH_NEW_NOTIFICATIONS_REQUEST, fetchNewNotifications,
);

function* fetchOldNotifications(action) {
  const token = action.payload;
  try {
    const oldNotifications = yield call(api.fetchOldNotifications, token);
    yield put(actions.fetchOldNotificationsSuccess(oldNotifications));
  } catch (error) {
    yield put(actions.fetchOldNotificationsFailure(error));
  }
}

const watchFetchOldNotifications = takeLatest(
  FETCH_OLD_NOTIFICATIONS_REQUEST, fetchOldNotifications,
);

function* fetchNotificationCheckTimeSaga(action) {
  const token = action.payload;
  try {
    const checkTime = yield call(api.fetchNotifCheckTime, token);
    yield put(actions.fetchNotoficationCheckTimeSuccess(checkTime));
  } catch (error) {
    yield put(actions.fetchNotoficationCheckTimeFailure(error));
  }
}

const watchFetchNotificationCheckTimeRequest = takeLatest(
  FETCH_NOTIFICATION_CHECK_TIME_REQUEST, fetchNotificationCheckTimeSaga,
);

function* loginSuccessSaga() {
  const token = yield select(selectToken);

  try {
    const socket = getSocket();
    socket.emit('LOGIN', token);
    console.log('소켓이 살아있다!');
  } catch (e) {
    console.log('소켓이 죽었다!');
  }


  yield put(actions.fetchMyInfo(token));
  yield put(actions.fetchNewNotifications(token));
  yield put(actions.fetchOldNotifications(token));
  yield put(actions.fetchNotoficationCheckTime(token));
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
  watchFetchNewNotifications,
  watchFetchOldNotifications,
  autoLogin(),
  watchLoginSuccess,
  watchFetchNotificationCheckTimeRequest,
];

export default authSagas;
