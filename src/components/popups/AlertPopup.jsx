import React from 'react';

import Popup from './Popup';
import LoginButton from '../layout/LoginButton';
import './AlertPopup.scss';

const AlertPopup = (props) => {
  const {
    close, pos, message, title, loginButton,
  } = props;

  return (
    <Popup close={close} pos={pos} title={title || 'ㅇ_ㅇ;;'}>
      <div className="AlertPopup">
        <span className="alert-message">
          {message}
        </span>
        {loginButton && <LoginButton afterLogin={() => close()}/>}
      </div>
    </Popup>
  );
};
export default AlertPopup;
