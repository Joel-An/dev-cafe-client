import React from 'react';
import PropTypes from 'prop-types';
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

ConfirmPopup.propTypes = {
  pos: PropTypes.shape({
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  openAlert: PropTypes.func.isRequired,
};

ConfirmPopup.defaultProps = {
  pos: undefined,
  title: undefined,
};

const mapDispatchToProps = { openAlert: openAlertAction };

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmPopup);
