import React from 'react';

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

export default Notification;
