import * as Types from '../types/popups';

export const openLoginPopup = ({ pos, afterLogin }) => ({
  type: Types.OPEN_POPUP,
  popupType: Types.LOGIN_POPUP,
  popupProps: {
    pos,
    afterLogin,
  },
});

export const closePopup = popupType => ({
  type: Types.CLOSE_POPUP,
  popupType,
});

export const closeLoginPopup = () => closePopup(Types.LOGIN_POPUP);

export const openAlert = ({
  title, message, pos, loginButton,
}) => ({
  type: Types.OPEN_POPUP,
  popupType: Types.ALERT_POPUP,
  popupProps: {
    title,
    message,
    pos,
    loginButton,
  },
});

export const openConfirm = ({
  title, message, onConfirm, pos,
}) => ({
  type: Types.OPEN_POPUP,
  popupType: Types.CONFIRM_POPUP,
  popupProps: {
    title,
    message,
    onConfirm,
    pos,
  },
});
