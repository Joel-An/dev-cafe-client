import merge from 'lodash/merge';

import {
  FETCH_NEW_CHILD_COMMENT_REQUEST,
  FETCH_NEW_CHILD_COMMENT_SUCCESS,
  FETCH_NEW_CHILD_COMMENT_FAILURE,
  FETCH_NEW_PARENT_COMMENT_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  REMOVE_COMMENT,
  FETCH_UPDATED_COMMENT_SUCCESS,
  ADD_HEART,
  REMOVE_HEART,
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
      [parent._id]: {
        ...parent,
        isFetchingNewChildComment: false,
        childComments: parent.childComments.concat(child._id),
      },
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

// 댓글 갱신
const updateComment = (state, action) => {
  const id = action.commentId;
  const comments = action.response.getEntity('comments');
  const comment = comments[id];

  return { ...state, [id]: comment };
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
  case FETCH_NEW_CHILD_COMMENT_REQUEST: {
    const { parentId } = action;
    const parentComment = state[parentId];

    return {
      ...state,
      [parentId]: {
        ...parentComment,
        isFetchingNewChildComment: true,
      },
    };
  }
  case FETCH_NEW_CHILD_COMMENT_FAILURE: {
    const { parentId } = action;
    const parentComment = state[parentId];

    return {
      ...state,
      [parentId]: {
        ...parentComment,
        isFetchingNewChildComment: false,
      },
    };
  }
  case FETCH_NEW_CHILD_COMMENT_SUCCESS:
  case FETCH_NEW_PARENT_COMMENT_SUCCESS: {
    return addComment(state, action);
  }
  case FETCH_COMMENTS_SUCCESS: {
    const comments = action.response.getEntity('comments');
    return merge({}, state, comments);
  }
  case REMOVE_COMMENT: {
    const { commentId } = action;
    return removeComment(state, commentId);
  }
  case FETCH_UPDATED_COMMENT_SUCCESS: {
    return updateComment(state, action);
  }
  case ADD_HEART: {
    const { commentId, authorId } = action;

    const comment = state[commentId];

    return comment ? { ...state, [commentId]: { ...comment, authorHeart: authorId } } : state;
  }
  case REMOVE_HEART: {
    const { commentId } = action;
    const comment = state[commentId];

    return comment ? { ...state, [commentId]: { ...comment, authorHeart: null } } : state;
  }
  default:
    return state;
  }
};

export default commentsReducer;
