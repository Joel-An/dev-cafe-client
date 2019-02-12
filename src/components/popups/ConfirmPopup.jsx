import React from 'react';
import { connect } from 'react-redux';

import Popup from './Popup';
import './ConfirmPopup.scss';

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
      <div className="ConfirmPopup">
        <div className="spacer"/>
        <span className="message">
          {message}
        </span>
        <div className="confirm-menu" >
          <button type="button" onClick={confirm}>
          YES
          </button>
        </div>
      </div>
    </Popup>
  );
};

const mapDispatchToProps = { openAlert: openAlertAction };

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmPopup);
