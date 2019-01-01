import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import categories from './categories';
import auth from './auth';

const entities = (state = { categories: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

export default combineReducers({
  categories, auth, entities,
});
