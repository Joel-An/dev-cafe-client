import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../types/notifications';

function filterNotifications(notifications, id) {
  return notifications.filter(notification => notification.id !== id);
}

const notifications = (state = [], action) => {
  switch (action.type) {
  case ADD_NOTIFICATION: {
    const { notificationProps } = action;
    const filteredNotifications = filterNotifications(state, notificationProps.id);

    return [...filteredNotifications, notificationProps];
  }
  case REMOVE_NOTIFICATION: {
    const { id } = action;
    return filterNotifications(state, id);
  }
  case CLEAR_NOTIFICATIONS: {
    return [];
  }
  default:
    return state;
  }
};

export default notifications;
