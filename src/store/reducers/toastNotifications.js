import {
  ADD_TOAST_NOTIFICATION,
  REMOVE_TOAST_NOTIFICATION,
  CLEAR_TOAST_NOTIFICATIONS,
} from '../types/toastNotifications';

function filterNotifications(notifications, id) {
  return notifications.filter(notification => notification.id !== id);
}

const toastNotifications = (state = [], action) => {
  switch (action.type) {
  case ADD_TOAST_NOTIFICATION: {
    const { notificationProps } = action;
    const filteredNotifications = filterNotifications(state, notificationProps.id);

    return [...filteredNotifications, notificationProps];
  }
  case REMOVE_TOAST_NOTIFICATION: {
    const { id } = action;
    return filterNotifications(state, id);
  }
  case CLEAR_TOAST_NOTIFICATIONS: {
    return [];
  }
  default:
    return state;
  }
};

export default toastNotifications;
