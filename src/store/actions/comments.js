import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
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

export const loadComments = postId => ({
  type: LOAD_COMMENTS,
  postId,
});

export const loadCommentsSuccess = () => ({
  type: LOAD_COMMENTS_SUCCESS,
});
