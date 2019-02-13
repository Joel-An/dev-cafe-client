import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../types/notifications';

const createId = () => {
  const timeStamp = Date.now().toString().slice(-5);
  const randomString = Math.random().toString(36).substr(2, 10);

  return timeStamp + randomString;
};

// 리덕스가 요구하는 순수함수가 아니다.
// 순수하게 만들 수는 있지만 너무 번거로워져서 그냥 구현하기로함.
export const addNotification = ({ message, visibleTime = 3000 }) => ({
  type: ADD_NOTIFICATION,
  notificationProps: {
    id: createId(),
    message,
    visibleTime,
  },
});

export const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  id,
});

export const clearAllNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});
