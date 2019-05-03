import { createSelector } from 'reselect';

import { selectUserById } from './users';

export const selectToken = state => state.auth.token;

const selectMyId = state => state.auth.myId;

const GUEST = {
  _id: undefined,
  profileName: undefined,
  isGuest: true,
};

export const selectMyInfo = (state) => {
  const myId = selectMyId(state);
  const myInfo = selectUserById(state, myId);

  return myInfo || GUEST;
};

export const selectNewNotifications = state => state.auth.newNotifications;
export const selectOldNotifications = state => state.auth.oldNotifications;

export const selectLastNotificationCheckTime = state => state.auth.lastNotificationCheckTime;

export const selectUncheckedNotificationCount = createSelector(
  [selectNewNotifications, selectLastNotificationCheckTime],
  (newNotifications, lastCheckTime) => newNotifications
    .filter(noti => noti.date > lastCheckTime).length,
);
