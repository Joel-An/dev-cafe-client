import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropDownMenu from '../common/DropDownMenu';
import UserNotificationList from './UserNotificationList';
import { selectNewNotifications, selectOldNotifications, selectUncheckedNotificationCount } from '../../store/selectors/auth';
import { updateNotifCheckTime } from '../../api/auth';
import withToken, { tokenPropType } from '../../containers/WithToken';
import { connectComponent } from '../../utils';
import { notificationPropInfo } from './UserNotificationTypes/UserNotification';

import './UserNotificationMenu.scss';

const ToggleIcon = (props) => {
  const { newNotificationCount } = props;
  const hasNewNotification = !!newNotificationCount;
  return (
    <Fragment>
      <FontAwesomeIcon icon="bell"/>
      <div className="new-notification-count-wrapper">
        {
          hasNewNotification && <div className="new-notification-count">
            {newNotificationCount}
          </div>
        }
      </div>
    </Fragment>
  );
};

ToggleIcon.propTypes = {
  newNotificationCount: PropTypes.number.isRequired,
};

const UserNotificationMenu = (props) => {
  const {
    newNotifications,
    oldNotifications,
    token,
    uncheckedNotificationCount,
  } = props;

  const updateNotificationCheckTime = useCallback(() => {
    if (uncheckedNotificationCount > 0) {
      updateNotifCheckTime(token);
    }
  }, [token, uncheckedNotificationCount]);

  const hasNewNotif = newNotifications.length > 0;
  const hasOldNotif = oldNotifications.length > 0;
  const isEmpty = !hasNewNotif && !hasOldNotif;

  return (
    <DropDownMenu
      className="user-notifications"
      toggleIcon={<ToggleIcon newNotificationCount={uncheckedNotificationCount}/>
      }
      onOpen={updateNotificationCheckTime}
      onClose={updateNotificationCheckTime}
    >
      <Fragment>
        <div className="notification-list-title">
          {hasNewNotif ? '새로운 알림' : '알림'}
        </div>
        <UserNotificationList
          className="new-notifications"
          notifications={newNotifications}
        />
        {hasNewNotif && hasOldNotif
          ? <div className="notification-list-title">이전 알림</div>
          : null
        }
        <UserNotificationList
          className="old-notifications"
          notifications={oldNotifications}
        />
        {
          isEmpty && <div className="empty-notifications">알림이 없습니다!</div>
        }
      </Fragment>
    </DropDownMenu>
  );
};

UserNotificationMenu.propTypes = {
  newNotifications: PropTypes.arrayOf(notificationPropInfo.type).isRequired,
  oldNotifications: PropTypes.arrayOf(notificationPropInfo.type).isRequired,
  token: tokenPropType.type.isRequired,
  uncheckedNotificationCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const newNotifications = selectNewNotifications(state);
  const oldNotifications = selectOldNotifications(state);
  const uncheckedNotificationCount = selectUncheckedNotificationCount(state);

  return { newNotifications, oldNotifications, uncheckedNotificationCount };
};

export default connectComponent(UserNotificationMenu,
  [
    connect(mapStateToProps),
    withToken,
  ]);
