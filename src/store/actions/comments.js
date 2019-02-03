import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  REMOVE_COMMENT,
  CHECK_CACHE_AND_UPDATE_COMMENT,
  FETCH_UPDATED_COMMENT_REQUEST,
  FETCH_UPDATED_COMMENT_SUCCESS,
  FETCH_UPDATED_COMMENT_FAILURE,
  START_EDITING_COMENT,
  EDITING_COMMENT_DONE,
  LOAD_EDITING_COMMENT,
} from '../types/comments';

import { CALL_API } from '../sagas/apiSaga';
import Schemas from '../utils/schema';

export const fetchComments = (postId, refreshCache = false) => ({
  type: CALL_API,
  types: [GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE],
  endpoint: `/comments?post=${postId}`,
  postId,
  method: 'get',
  refreshCache,
  schema: Schemas.COMMENT_ARRAY,
});

export const fetchComment = (commentId, postId) => ({
  type: CALL_API,
  types: [GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_COMMENT_FAILURE],
  endpoint: `/comments/${commentId}`,
  commentId,
  postId,
  method: 'get',
  schema: Schemas.COMMENT,
});

export const checkCacheAndUpdateComment = commentId => ({
  type: CHECK_CACHE_AND_UPDATE_COMMENT,
  commentId,
});

export const fetchUpdatedComment = (commentId) => {
  const action = fetchComment(commentId);
  action.types = [
    FETCH_UPDATED_COMMENT_REQUEST,
    FETCH_UPDATED_COMMENT_SUCCESS,
    FETCH_UPDATED_COMMENT_FAILURE,
  ];

  return action;
};

export const loadComments = postId => ({
  type: LOAD_COMMENTS,
  postId,
});

export const loadCommentsSuccess = () => ({
  type: LOAD_COMMENTS_SUCCESS,
});

export const removeComment = (commentId, postId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId,
});

export const loadEditingComment = commentId => ({
  type: LOAD_EDITING_COMMENT,
  commentId,
});

export const startEditingComment = commentId => ({
  type: START_EDITING_COMENT,
  commentId,
});

export const editingCommentDone = commentId => ({
  type: EDITING_COMMENT_DONE,
  commentId,
});
