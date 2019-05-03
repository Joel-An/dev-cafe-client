import {
  put, take, takeEvery, race, call, delay,
} from 'redux-saga/effects';

import {
  ADD_TOAST_NOTIFICATION,
  REMOVE_TOAST_NOTIFICATION,
  CLEAR_TOAST_NOTIFICATIONS,
} from '../types/toastNotifications';
import { removeToastNotification } from '../actions/toastNotifications';

function* waitClearNotifications() {
  yield take(CLEAR_TOAST_NOTIFICATIONS);

  return true;
}

function* waitRemoveNotification(notificationId) {
  while (true) {
    const action = yield take(REMOVE_TOAST_NOTIFICATION);
    const { id } = action;

    if (id === notificationId) {
      return true;
    }
  }
}

function* watchToastNotification(action) {
  const { notificationProps } = action;
  const { visibleTime, id } = notificationProps;

  if (visibleTime) {
    const { timeout, removed, reset } = yield race({
      timeout: delay(visibleTime),
      removed: call(waitRemoveNotification, id),
      reset: call(waitClearNotifications),
    });

    if (timeout) {
      yield put(removeToastNotification(id));
    }
  }
}

const watchToastNotifications = takeEvery(ADD_TOAST_NOTIFICATION, watchToastNotification);

const toastNotificationsSagas = [
  watchToastNotifications,
];

export default toastNotificationsSagas;
