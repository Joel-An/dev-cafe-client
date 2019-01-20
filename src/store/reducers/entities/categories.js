import merge from 'lodash/merge';

import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  REMOVE_CATEGORY,
} from '../../types/categories';

const initialState = {};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CATEGORY_SUCCESS:
    return {
      ...state,
      ...action.response.getEntity('categories'),
    };
  case GET_CATEGORIES_SUCCESS:
    return merge({}, state, action.response.getEntity('categories'));
  case REMOVE_CATEGORY: {
    const id = action.payload;
    const newState = { ...state };
    delete newState[id];
    return newState;
  }
  default:
    return state;
  }
};

export default categoriesReducer;
