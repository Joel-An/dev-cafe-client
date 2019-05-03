import {
  ADD_TOAST_NOTIFICATION,
  REMOVE_TOAST_NOTIFICATION,
  CLEAR_TOAST_NOTIFICATIONS,
} from '../types/toastNotifications';

const createId = () => {
  const timeStamp = Date.now().toString().slice(-5);
  const randomString = Math.random().toString(36).substr(2, 10);

  return timeStamp + randomString;
};

// 리덕스가 요구하는 순수함수가 아니다.
// 순수하게 만들 수는 있지만 너무 번거로워져서 그냥 구현하기로함.
export const addToastNotification = ({ message, visibleTime = 3000 }) => ({
  type: ADD_TOAST_NOTIFICATION,
  notificationProps: {
    id: createId(),
    message,
    visibleTime,
  },
});

export const removeToastNotification = id => ({
  type: REMOVE_TOAST_NOTIFICATION,
  id,
});

export const clearAllToastNotifications = () => ({
  type: CLEAR_TOAST_NOTIFICATIONS,
});
