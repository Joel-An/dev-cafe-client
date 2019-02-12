import React from 'react';

import Popup from './Popup';

const AlertPopup = (props) => {
  const { close } = props;
  return (
    <Popup close={close}>
      AlertPopup
    </Popup>
  );
};
export default AlertPopup;
