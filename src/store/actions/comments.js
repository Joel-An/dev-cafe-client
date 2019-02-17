import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_NEW_COMMENT_REQUEST,
  FETCH_NEW_COMMENT_SUCCESS,
  FETCH_NEW_COMMENT_FAILURE,
  REMOVE_COMMENT,
  CHECK_CACHE_AND_UPDATE_COMMENT,
  FETCH_UPDATED_COMMENT_REQUEST,
  FETCH_UPDATED_COMMENT_SUCCESS,
  FETCH_UPDATED_COMMENT_FAILURE,
  START_EDITING_COMENT,
  SAVE_EDITING_COMENT,
  EDITING_COMMENT_DONE,
  LOAD_EDITING_COMMENT,
} from '../types/comments';

import { CALL_API } from '../sagas/apiSaga';
import Schemas from '../utils/schema';

export const fetchComments = (postId, refreshCache = false) => ({
  type: CALL_API,
  types: [FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE],
  endpoint: `/comments?post=${postId}`,
  postId,
  method: 'get',
  refreshCache,
  schema: Schemas.COMMENT_ARRAY,
});

export const fetchComment = (commentId, parentId, postId) => ({
  type: CALL_API,
  types: [FETCH_NEW_COMMENT_REQUEST, FETCH_NEW_COMMENT_SUCCESS, FETCH_NEW_COMMENT_FAILURE],
  endpoint: `/comments/${commentId}`,
  commentId,
  parentId,
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

export const startEditingComment = comment => ({
  type: START_EDITING_COMENT,
  comment,
});

export const saveEditingComment = editingComment => ({
  type: SAVE_EDITING_COMENT,
  editingComment,
});

export const editingCommentDone = commentId => ({
  type: EDITING_COMMENT_DONE,
  commentId,
});
