import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_NEW_PARENT_COMMENT_REQUEST,
  FETCH_NEW_PARENT_COMMENT_SUCCESS,
  FETCH_NEW_PARENT_COMMENT_FAILURE,
  FETCH_NEW_CHILD_COMMENT_REQUEST,
  FETCH_NEW_CHILD_COMMENT_SUCCESS,
  FETCH_NEW_CHILD_COMMENT_FAILURE,
  REMOVE_COMMENT,
  CHECK_CACHE_AND_UPDATE_COMMENT,
  CHECK_CACHE_AND_FETCH_NEW_COMMENT,
  FETCH_UPDATED_COMMENT_REQUEST,
  FETCH_UPDATED_COMMENT_SUCCESS,
  FETCH_UPDATED_COMMENT_FAILURE,
  START_EDITING_COMENT,
  SAVE_EDITING_COMENT,
  EDITING_COMMENT_DONE,
  LOAD_EDITING_COMMENT,
  ADD_HEART,
  REMOVE_HEART,
  ADD_COMMENT_LIKES,
  REMOVE_COMMENT_LIKES,
  ADD_COMMENT_DISLIKES,
  REMOVE_COMMENT_DISLIKES,
} from '../types/comments';

import { CALL_API } from '../sagas/apiSaga';
import Schemas from '../utils/schema';

export const fetchComments = postId => ({
  type: CALL_API,
  types: [FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE],
  endpoint: `/comments?post=${postId}`,
  postId,
  method: 'get',
  schema: Schemas.COMMENT_ARRAY,
});

export const fetchNextPageComments = (nextPageUrl, postId) => {
  const action = fetchComments(postId);
  action.endpoint = () => nextPageUrl;

  return action;
};

export const fetchComment = (commentId, postId) => ({
  type: CALL_API,
  endpoint: `/comments/${commentId}`,
  commentId,
  postId,
  method: 'get',
  schema: Schemas.COMMENT,
});

export const checkCacheAndFetchNewComment = (commentId, postId, parentId = false) => ({
  type: CHECK_CACHE_AND_FETCH_NEW_COMMENT,
  commentId,
  postId,
  parentId,
  isChild: !!parentId,
});

export const fetchNewParentComment = (commentId, postId) => {
  const action = fetchComment(commentId, postId);
  action.types = [
    FETCH_NEW_PARENT_COMMENT_REQUEST,
    FETCH_NEW_PARENT_COMMENT_SUCCESS,
    FETCH_NEW_PARENT_COMMENT_FAILURE,
  ];

  return action;
};

export const fetchNewChildComment = (commentId, parentId, postId) => {
  const action = fetchComment(commentId, postId);
  action.types = [
    FETCH_NEW_CHILD_COMMENT_REQUEST,
    FETCH_NEW_CHILD_COMMENT_SUCCESS,
    FETCH_NEW_CHILD_COMMENT_FAILURE,
  ];
  action.parentId = parentId;

  return action;
};

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

export const addHeart = (commentId, authorId) => ({
  type: ADD_HEART,
  commentId,
  authorId,
});

export const removeHeart = commentId => ({
  type: REMOVE_HEART,
  commentId,
});

export const addCommentLikes = (commentId, userId) => ({
  type: ADD_COMMENT_LIKES,
  commentId,
  userId,
});

export const removeCommentLikes = (commentId, userId) => ({
  type: REMOVE_COMMENT_LIKES,
  commentId,
  userId,
});

export const addCommentDislikes = (commentId, userId) => ({
  type: ADD_COMMENT_DISLIKES,
  commentId,
  userId,
});

export const removeCommentDislikes = (commentId, userId) => ({
  type: REMOVE_COMMENT_DISLIKES,
  commentId,
  userId,
});
