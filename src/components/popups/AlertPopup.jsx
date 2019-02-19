import React from 'react';
import PropTypes from 'prop-types';

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

AlertPopup.propTypes = {
  pos: PropTypes.shape({
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  close: PropTypes.func,
  message: PropTypes.string,
  title: PropTypes.string,
  loginButton: PropTypes.bool,
};

AlertPopup.defaultProps = {
  pos: undefined,
  title: undefined,
  close: undefined,
  message: undefined,
  loginButton: undefined,
};

export default AlertPopup;
