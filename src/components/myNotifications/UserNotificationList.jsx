import React from 'react';
import classNames from 'classnames';
import NotificationSwitcher from './UserNotificationSwitcher';

const MyNotificationList = (props) => {
  const { notifications, title, className } = props;

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={classNames('notification-list', className)}>
      {notifications.map(
        notification => <NotificationSwitcher notification={notification} key={notification._id}/>,
      )}
    </div>
  );
};

export default MyNotificationList;
