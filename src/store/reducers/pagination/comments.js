import union from 'lodash/union';
import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
} from '../../types/comments';

const mapActionToKey = action => action.postId;

const commentsByPost = (state = {}, action) => {
  switch (action.type) {
  case GET_COMMENT_REQUEST:
  case GET_COMMENTS_REQUEST: {
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
  case GET_COMMENT_FAILURE:
  case GET_COMMENTS_FAILURE: {
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
  case GET_COMMENTS_SUCCESS: {
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
  case GET_COMMENT_SUCCESS: {
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
          ids: union([id], meta.ids),
          isFetching: false,
        },
      };
  }
  default:
    return state;
  }
};

export default commentsByPost;
