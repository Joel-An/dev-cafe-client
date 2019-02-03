import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import auth from './auth';
import paginate from './paginate';
import * as PostActions from '../types/posts';
import * as CommentActions from '../types/comments';
import newEntities from './entities';
import newPagination from './pagination';
import editing from './editing';

const INITIAL_ENTITIES = {
  categories: {}, users: {}, posts: {}, comments: {},
};

const entities = (state = INITIAL_ENTITIES, action) => {
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
  commentsByPost: paginate({
    mapActionToKey: action => action.postId,
    types: [
      CommentActions.GET_COMMENTS_REQUEST,
      CommentActions.GET_COMMENTS_SUCCESS,
      CommentActions.GET_COMMENTS_FAILURE,
    ],
  }),
});

export default combineReducers({
  auth, entities, pagination, newEntities, newPagination, editing,
});
