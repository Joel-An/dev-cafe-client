import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NotificationSwitcher from './UserNotificationSwitcher';
import { notificationPropInfo } from './UserNotificationTypes/UserNotification';

const MyNotificationList = (props) => {
  const { notifications, className } = props;

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

MyNotificationList.propTypes = {
  notifications: PropTypes.arrayOf(notificationPropInfo.type).isRequired,
  className: PropTypes.string.isRequired,
};

export default MyNotificationList;
