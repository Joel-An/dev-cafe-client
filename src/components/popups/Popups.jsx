import React from 'react';

import PopupSwitcher from './PopupsSwitcher';

import LoginPopup from './LoginPopup';
import ConfirmPopup from './ConfirmPopup';
import AlertPopup from './AlertPopup';

import * as Types from '../../store/types/popups';

const Popups = () => (
  <PopupSwitcher>
    <LoginPopup popupType={Types.LOGIN_POPUP} />
    <ConfirmPopup popupType={Types.CONFIRM_POPUP} escapable/>
    <AlertPopup popupType={Types.ALERT_POPUP} escapable/>
  </PopupSwitcher>
);


export default Popups;
