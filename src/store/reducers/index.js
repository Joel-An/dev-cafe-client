import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import auth from './auth';

const entities = (state = { categories: {}, users: {} }, action) => {
  if (action.response && action.response.entities) {
    if (action.refreshCache) {
      return ({ ...state, ...action.response.entities });
    }
    return merge({}, state, action.response.entities);
  }

  return state;
};

export default combineReducers({
  auth, entities,
});
