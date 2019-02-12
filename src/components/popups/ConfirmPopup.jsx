import React from 'react';
import { connect } from 'react-redux';

import Popup from './Popup';

import { openAlert as openAlertAction } from '../../store/actions/popups';

const ConfirmPopup = (props) => {
  const {
    close, pos, onConfirm, title, message, openAlert,
  } = props;

  const confirm = () => {
    onConfirm()
      .then(() => {
        close();
      })
      .catch((err) => {
        close();
        openAlert({
          message: err,
          pos,
        });
      });
  };

  return (
    <Popup close={close} pos={pos} title={title}>
      {message}
      <button type="button" onClick={confirm}>
        YES
      </button>
    </Popup>
  );
};

const mapDispatchToProps = { openAlert: openAlertAction };

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmPopup);
