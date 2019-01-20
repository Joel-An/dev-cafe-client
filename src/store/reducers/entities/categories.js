import merge from 'lodash/merge';

import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
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
  default:
    return state;
  }
};

export default categoriesReducer;
