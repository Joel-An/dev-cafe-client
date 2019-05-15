import {
  put, call, takeLatest, select, take, race,
} from 'redux-saga/effects';

import {
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_REDIRECT_URI,
} from '../../config';

import {
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  FETCH_MYINFO_REQUEST,
  FETCH_NEW_NOTIFICATIONS_REQUEST,
  FETCH_OLD_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATION_CHECK_TIME_REQUEST,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_IN_PROGRESS,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
} from '../types/auth';
import * as actions from '../actions/auth';
import { openAlert, closeLoginPopup } from '../actions/popups';
import { addToastNotification } from '../actions/toastNotifications';
import * as api from '../../api/auth';
import { selectToken } from '../selectors/auth';

import { getSocket } from '../../socket';
import { removeTitle } from '../../utils';

function* requestLogout(logoutAction) {
  try {
    yield call(api.logout, logoutAction.payload);
    yield put(actions.logoutSucceeded());

    try {
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit('LOGOUT');
      }
    } catch (e) {
      // socket is not initialized yet
    }
  } catch (error) {
    yield put(actions.logoutFailed(error));
  }
}

const watchLogout = takeLatest(LOGOUT_REQUEST, requestLogout);

function* fetchUserInfo(action) {
  const token = action.payload;
  try {
    const myInfo = yield call(api.fetchUserInfo, token);
    yield put(
      addToastNotification({
        message: `${removeTitle(myInfo.profileName)}님 안녕하세요!`,
        visibleTime: 1500,
      }),
    );

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

    if (socket && socket.connected) {
      socket.emit('LOGIN', token);
    }
  } catch (e) {
    // socket is not initialized yet
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

const openNewWindow = (uri) => {
  const width = 500;
  const height = 650;

  const top = window.outerHeight / 2 + window.screenY - (height / 2);
  const left = window.outerWidth / 2 + window.screenX - (width / 2);

  const options = `
    menubar=no,
    location=no,
    resizable=yes,
    width=${width},
    height=${height},
    left=${left},
    top=${top}
  `;

  return window.open(
    uri,
    '',
    options,
  );
};

const buildGithubOauthURI = (socketId) => {
  const scope = 'read:user,user:email';

  return `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${GITHUB_OAUTH_REDIRECT_URI}&state=${socketId}&scope=${scope}`;
};

function* githubLogin() {
  let newWindow;
  try {
    const socket = getSocket();
    const socketId = socket.id;

    const uri = buildGithubOauthURI(socketId);

    newWindow = openNewWindow(uri);

    yield take(GITHUB_LOGIN_IN_PROGRESS);

    const { success, failure } = yield race({
      success: take(GITHUB_LOGIN_SUCCESS),
      failure: take(GITHUB_LOGIN_FAILURE),
    });

    if (success) {
      const token = success.payload;
      yield put(actions.loginSucceeded(token));
    }

    if (failure) {
      throw new Error(failure.payload);
    }
  } catch (e) {
    yield put(
      openAlert({
        title: 'ㅎ_ㅎ;;',
        message: e.message || '연결 실패. 잠시 후 다시 시도해주세요.',
      }),
    );
  } finally {
    if (newWindow && !newWindow.closed) {
      newWindow.close();
    }
    yield put(closeLoginPopup());
  }
}

const watchGithubLogin = takeLatest(GITHUB_LOGIN_REQUEST, githubLogin);

const authSagas = [
  watchLogout,
  watchFetchUserInfo,
  watchFetchNewNotifications,
  watchFetchOldNotifications,
  autoLogin(),
  watchLoginSuccess,
  watchFetchNotificationCheckTimeRequest,
  watchGithubLogin,
];

export default authSagas;
