import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
} from '../types/categories';

const INITIAL_STATE = {
  payload: [],
  showError: false,
  error: null,
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
  case FETCH_CATEGORIES_FULFILLED:
    return {
      ...state,
      payload,
    };
  case FETCH_CATEGORIES_REJECTED:
    return {
      ...state,
      showError: true,
      error,
    };
  default:
    return state;
  }
};
