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

export const openAlert = ({ title, message, pos }) => ({
  type: Types.OPEN_POPUP,
  popupType: Types.ALERT_POPUP,
  popupProps: {
    title,
    message,
    pos,
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
