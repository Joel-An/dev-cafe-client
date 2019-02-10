import { combineReducers } from 'redux';

import {
  UPDATE_LAST_VISITED_CATEGORY,
} from '../types/categories';

const lastVisitedCategory = (state = 'all', action) => {
  switch (action.type) {
  case UPDATE_LAST_VISITED_CATEGORY: {
    const { categoryId } = action;
    return categoryId;
  }
  default:
    return state;
  }
};

export default combineReducers({
  lastVisitedCategory,
});
