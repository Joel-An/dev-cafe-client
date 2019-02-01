import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from '../types/posts';

import { CALL_API } from '../sagas/apiSaga';
import Schemas from '../utils/schema';

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

export const fetchPost = (postId, category) => ({
  type: CALL_API,
  types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
  endpoint: `/posts/${postId}`,
  postId,
  method: 'get',
  category,
  schema: Schemas.POST,
});

export const loadPost = postId => ({
  type: LOAD_POST,
  postId,
});

export const loadPostSuccess = () => ({
  type: LOAD_POST_SUCCESS,
});
