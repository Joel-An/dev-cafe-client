import { combineReducers } from 'redux';

import * as CommentActions from '../../types/comments';

const comments = (state = {}, action) => {
  switch (action.type) {
  case CommentActions.START_EDITING_COMENT: {
    const { comment } = action;
    const editingComment = {
      _id: comment._id,
      post: comment.post,
      contents: comment.contents,
    };
    return {
      ...state,
      [editingComment._id]: editingComment,
    };
  }
  case CommentActions.SAVE_EDITING_COMENT: {
    const { editingComment } = action;
    return {
      ...state,
      [editingComment._id]: editingComment,
    };
  }
  case CommentActions.EDITING_COMMENT_DONE: {
    const { commentId } = action;
    const newState = { ...state };
    delete newState[commentId];
    return newState;
  }
  default:
    return state;
  }
};

export default combineReducers({
  comments,
});
