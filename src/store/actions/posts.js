import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  LOAD_POST,
  LOAD_POST_SUCCESS,
  FETCH_NEW_POST_REQUEST,
  FETCH_NEW_POST_SUCCESS,
  FETCH_NEW_POST_FAILURE,
  FETCH_POST_CONTENTS_REQUEST,
  FETCH_POST_CONTENTS_SUCCESS,
  FETCH_POST_CONTENTS_FAILURE,
  REMOVE_POST,
  START_EDITING_POST,
  SAVE_EDITING_POST,
  EDITING_POST_DONE,
  LOAD_EDITING_POST,
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

const fetchPost = postId => ({
  type: CALL_API,
  endpoint: `/posts/${postId}`,
  postId,
  method: 'get',
  schema: Schemas.POST,
});

export const fetchNewPost = (postId, category) => {
  const action = fetchPost(postId);

  action.types = [
    FETCH_NEW_POST_REQUEST,
    FETCH_NEW_POST_SUCCESS,
    FETCH_NEW_POST_FAILURE,
  ];
  action.category = category;

  return action;
};

export const fetchPostContents = (postId) => {
  const action = fetchPost(postId);
  action.types = [
    FETCH_POST_CONTENTS_REQUEST,
    FETCH_POST_CONTENTS_SUCCESS,
    FETCH_POST_CONTENTS_FAILURE,
  ];

  return action;
};

export const loadPost = postId => ({
  type: LOAD_POST,
  postId,
});

export const loadPostSuccess = () => ({
  type: LOAD_POST_SUCCESS,
});

export const removePost = (postId, category) => ({
  type: REMOVE_POST,
  postId,
  category,
});

export const loadEditingPost = postId => ({
  type: LOAD_EDITING_POST,
  postId,
});

export const startEditingPost = post => ({
  type: START_EDITING_POST,
  post,
});

export const saveEditingPost = editingPost => ({
  type: SAVE_EDITING_POST,
  editingPost,
});

export const editingPostDone = postId => ({
  type: EDITING_POST_DONE,
  postId,
});
});
