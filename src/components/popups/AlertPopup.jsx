import React from 'react';

import Popup from './Popup';

const AlertPopup = (props) => {
  const {
    close, pos, message,
  } = props;

  return (
    <Popup close={close} pos={pos}>
      {message}
    </Popup>
  );
};
export default AlertPopup;
