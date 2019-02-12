import React from 'react';

import Popup from './Popup';
import './AlertPopup.scss';

const AlertPopup = (props) => {
  const {
    close, pos, message, title,
  } = props;

  return (
    <Popup close={close} pos={pos} title={title || 'ㅇ_ㅇ;;'}>
      <div className="AlertPopup">
        <span className="alert-message">
          {message}
        </span>
      </div>
    </Popup>
  );
};
export default AlertPopup;
