import { combineReducers } from 'redux';

import * as CommentActions from '../../types/comments';
import * as PostActions from '../../types/posts';

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

const posts = (state = {}, action) => {
  switch (action.type) {
  case PostActions.START_EDITING_POST: {
    const { post } = action;
    const editingPost = {
      _id: post._id,
      category: post.category,
      title: post.title,
      contents: post.contents,
    };
    return {
      ...state,
      [editingPost._id]: editingPost,
    };
  }
  case PostActions.SAVE_EDITING_POST: {
    const { editingPost } = action;
    return {
      ...state,
      [editingPost._id]: editingPost,
    };
  }
  case PostActions.EDITING_POST_DONE: {
    const { postId } = action;
    const newState = { ...state };
    delete newState[postId];
    return newState;
  }
  default:
    return state;
  }
};

export default combineReducers({
  comments, posts,
});
