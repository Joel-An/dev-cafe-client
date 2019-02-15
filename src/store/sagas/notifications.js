import {
  put, take, takeEvery, race, call,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../types/notifications';
import { removeNotification } from '../actions/notifications';

function* waitClearNotifications() {
  yield take(CLEAR_NOTIFICATIONS);

  return true;
}

function* waitRemoveNotification(notificationId) {
  while (true) {
    const action = yield take(REMOVE_NOTIFICATION);
    const { id } = action;

    if (id === notificationId) {
      return true;
    }
  }
}

function* watchNotification(action) {
  const { notificationProps } = action;
  const { visibleTime, id } = notificationProps;

  if (visibleTime) {
    const { timeout, removed, reset } = yield race({
      timeout: call(delay, visibleTime),
      removed: call(waitRemoveNotification, id),
      reset: call(waitClearNotifications),
    });

    if (timeout) {
      yield put(removeNotification(id));
    }
  }
}

const watchNotifications = takeEvery(ADD_NOTIFICATION, watchNotification);

const notificationsSagas = [
  watchNotifications,
];

export default notificationsSagas;
