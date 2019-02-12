import React from 'react';

import Popup from './Popup';

const ConfirmPopup = (props) => {
  const { close } = props;
  return (
    <Popup close={close}>
      ConfirmPopup
    </Popup>
  );
};
export default ConfirmPopup;
