import merge from 'lodash/merge';

import {
  GET_COMMENT_SUCCESS,
  GET_COMMENTS_SUCCESS,
  REMOVE_COMMENT,
} from '../../types/comments';


// 댓글 삭제
const removeFromParent = (state, child) => {
  const parent = state[child.parent];

  if (parent.childComments.includes(child._id)) {
    const newChildComments = parent.childComments.filter(id => id !== child._id);
    const newParent = { ...parent, childComments: newChildComments };
    return { ...state, [newParent._id]: { ...newParent } };
  }
  return state;
};

const removeComment = (state, id) => {
  const comment = state[id];

  if (comment) {
    const newState = comment.isChild ? removeFromParent(state, comment) : { ...state };
    delete newState[id];
    return newState;
  }
  return state;
};

// 댓글 추가
const addToParent = (state, child) => {
  const parent = state[child.parent];
  if (!parent.childComments.includes(child._id)) {
    return {
      ...state,
      [parent._id]: { ...parent, childComments: parent.childComments.concat(child._id) },
    };
  }
  return state;
};

const addComment = (state, action) => {
  const id = action.commentId;
  const comments = action.response.getEntity('comments');
  const comment = comments[id];

  const newState = { ...state, [id]: comment };

  if (comment.isChild) {
    return addToParent(newState, comment);
  }

  return newState;
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_COMMENT_SUCCESS: {
    return addComment(state, action);
  }
  case GET_COMMENTS_SUCCESS: {
    const comments = action.response.getEntity('comments');
    return merge({}, state, comments);
  }
  case REMOVE_COMMENT: {
    const { commentId } = action;
    return removeComment(state, commentId);
  }
  default:
    return state;
  }
};

export default commentsReducer;
