import React from 'react';
import PropTypes from 'prop-types';

import './Notification.scss';

const Notification = (props) => {
  const {
    message, close,
  } = props;

  return (
    <div className="Notification" >
      <div className="notification-icon"/>
      <div className="notification-message">
        {message}
      </div>
      <div className="notification-menu">
        <button type="button" onClick={close}>
            X
        </button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Notification;
