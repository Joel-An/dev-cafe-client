import union from 'lodash/union';
import {
  FETCH_NEW_COMMENT_REQUEST,
  FETCH_NEW_COMMENT_SUCCESS,
  FETCH_NEW_COMMENT_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  REMOVE_COMMENT,
} from '../../types/comments';

const mapActionToKey = action => action.postId;

const commentsByPost = (state = {}, action) => {
  switch (action.type) {
  case FETCH_NEW_COMMENT_REQUEST:
  case FETCH_COMMENTS_REQUEST: {
    const key = mapActionToKey(action);
    const meta = state[key];
    if (meta) {
      return { ...state, [key]: { ...state[key], isFetching: true } };
    }
    return {
      ...state,
      [key]: {
        isFetching: true,
        ids: [],
        error: false,
        nextPageUrl: null,
      },
    };
  }
  case FETCH_NEW_COMMENT_FAILURE:
  case FETCH_COMMENTS_FAILURE: {
    const key = mapActionToKey(action);
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        error: action.error,
        isFetching: false,
      },
    };
  }
  case FETCH_COMMENTS_SUCCESS: {
    const key = mapActionToKey(action);
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        ids: union(meta.ids, action.response.result),
        isFetching: false,
      },
    };
  }
  case FETCH_NEW_COMMENT_SUCCESS: {
    // 자식코멘트면 추가하지 않아야한다.
    const id = action.commentId;
    const comments = action.response.getEntity('comments');
    const comment = comments[id];

    const key = mapActionToKey(action);
    const meta = state[key];

    return comment.isChild
      ? {
        ...state,
        [key]: {
          ...meta,
          isFetching: false,
        },
      }
      : {
        ...state,
        [key]: {
          ...meta,
          ids: union(meta.ids, [id]),
          isFetching: false,
        },
      };
  }
  case REMOVE_COMMENT: {
    const key = mapActionToKey(action);
    const { commentId } = action;
    const meta = state[key];
    if (meta && meta.ids.includes(commentId)) {
      return {
        ...state,
        [key]: {
          ...meta,
          ids: meta.ids.filter(id => id !== commentId),
        },
      };
    }
    return state;
  }
  default:
    return state;
  }
};

export default commentsByPost;
