import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ToastNotification from './ToastNotification';
import { removeToastNotification as removeToastNotificationAction } from '../../store/actions/toastNotifications';

import './ToastNotifier.scss';

const ToastNotifier = (props) => {
  const { toastNotifications, removeToastNotification } = props;

  const renderedNotifications = toastNotifications.map((toast) => {
    const { id } = toast;

    return (
      <CSSTransition
        key={id}
        timeout={500}
        classNames="fade">
        <ToastNotification
          close={() => removeToastNotification(id)}
          {...toast}
        />
      </CSSTransition>
    );
  });

  return (
    <TransitionGroup className="ToastNotifier">
      {renderedNotifications}
    </TransitionGroup>
  );
};

const toastNotificationPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visibleTime: PropTypes.number,
});

ToastNotifier.propTypes = {
  removeToastNotification: PropTypes.func.isRequired,
  toastNotifications: PropTypes.arrayOf(toastNotificationPropType).isRequired,
};

const mapStateToProps = (state) => {
  const { toastNotifications } = state;

  return { toastNotifications };
};

const mapDispatchToProps = { removeToastNotification: removeToastNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotifier);
