import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Notification from './Notification';
import { removeNotification as removeNotificationAction } from '../../store/actions/notifications';

import './NotificationCenter.scss';

const NotificationCenter = (props) => {
  const { notifications, removeNotification } = props;

  const renderedNotifications = notifications.map((notification) => {
    const { id } = notification;

    return (
      <CSSTransition
        key={id}
        timeout={500}
        classNames="fade">
        <Notification
          close={() => removeNotification(id)}
          {...notification}
        />
      </CSSTransition>
    );
  });

  return (
    <TransitionGroup className="NotificationCenter">
      {renderedNotifications}
    </TransitionGroup>
  );
};

const notificationPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visibleTime: PropTypes.number,
});

NotificationCenter.propTypes = {
  removeNotification: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(notificationPropType).isRequired,
};

const mapStateToProps = (state) => {
  const { notifications } = state;

  return { notifications };
};

const mapDispatchToProps = { removeNotification: removeNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenter);
