import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../types/posts';

import { CALL_API, Schemas } from '../sagas/apiSaga';

export const fetchPosts = (category = 'all', refreshCache = false) => ({
  type: CALL_API,
  types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE],
  endpoint: category === 'all' ? '/posts' : `/posts?category=${category}`,
  category,
  method: 'get',
  refreshCache,
  schema: Schemas.POST_ARRAY,
});

export const loadPosts = category => ({
  type: LOAD_POSTS,
  category,
});

export const loadPostsSuccess = () => ({
  type: LOAD_POSTS_SUCCESS,
});
