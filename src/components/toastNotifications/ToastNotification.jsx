import React from 'react';
import PropTypes from 'prop-types';

import './ToastNotification.scss';

const ToastNotification = (props) => {
  const {
    message, close,
  } = props;

  return (
    <div className="ToastNotification" >
      <div className="toast-notification-icon"/>
      <div className="toast-notification-message">
        {message}
      </div>
      <div className="toast-notification-menu">
        <button type="button" onClick={close}>
            X
        </button>
      </div>
    </div>
  );
};

ToastNotification.propTypes = {
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ToastNotification;
