import {
  OPEN_POPUP,
  CLOSE_POPUP,
} from '../types/popups';

const popups = (state = [], action) => {
  switch (action.type) {
  case OPEN_POPUP: {
    const { popupType } = action;

    if (state.some(entry => entry.popupType === popupType)) {
      return state;
    }

    return state.concat([action]);
  }
  case CLOSE_POPUP: {
    const { popupType } = action;
    return state.filter(entry => entry.popupType !== popupType);
  }
  default:
    return state;
  }
};

export default popups;
