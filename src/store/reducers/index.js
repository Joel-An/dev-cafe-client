import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import auth from './auth';
import paginate from './paginate';
import * as PostActions from '../types/posts';

const entities = (state = { categories: {}, users: {} }, action) => {
  if (action.response && action.response.entities) {
    if (action.refreshCache) {
      return ({ ...state, ...action.response.entities });
    }
    return merge({}, state, action.response.entities);
  }

  return state;
};

const pagination = combineReducers({
  postsByCategory: paginate({
    mapActionToKey: action => action.category,
    types: [
      PostActions.GET_POSTS_REQUEST,
      PostActions.GET_POSTS_SUCCESS,
      PostActions.GET_POSTS_FAILURE,
    ],
  }),
});

export default combineReducers({
  auth, entities, pagination,
});
