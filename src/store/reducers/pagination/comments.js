import union from 'lodash/union';
import {
  FETCH_NEW_PARENT_COMMENT_REQUEST,
  FETCH_NEW_PARENT_COMMENT_SUCCESS,
  FETCH_NEW_PARENT_COMMENT_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  REMOVE_COMMENT,
} from '../../types/comments';

const mapActionToKey = action => action.postId;

const getDefaultMeta = () => ({
  isFetchingNewParentComment: false,
  isFetchingComments: false,
  ids: [],
  error: false,
  nextPageUrl: false,
});

const commentsByPost = (state = {}, action) => {
  switch (action.type) {
  case FETCH_NEW_PARENT_COMMENT_REQUEST: {
    const key = mapActionToKey(action);

    const meta = state[key];
    if (meta) {
      return { ...state, [key]: { ...state[key], isFetchingNewParentComment: true } };
    }
    return {
      ...state,
      [key]: {
        ...getDefaultMeta(),
        isFetchingNewParentComment: true,
      },
    };
  }
  case FETCH_COMMENTS_REQUEST: {
    const key = mapActionToKey(action);
    const meta = state[key];
    if (meta) {
      return { ...state, [key]: { ...state[key], isFetchingComments: true } };
    }
    return {
      ...state,
      [key]: {
        ...getDefaultMeta(),
        isFetchingComments: true,
      },
    };
  }
  case FETCH_NEW_PARENT_COMMENT_FAILURE: {
    const key = mapActionToKey(action);
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        error: action.error,
        isFetchingNewParentComment: false,
      },
    };
  }
  case FETCH_COMMENTS_FAILURE: {
    const key = mapActionToKey(action);
    const { statusCode } = action;
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        error: action.error,
        isFetchingComments: false,
        nextPageUrl: statusCode === 404 ? false : meta.nextPageUrl,
      },
    };
  }
  case FETCH_COMMENTS_SUCCESS: {
    const key = mapActionToKey(action);
    const { nextPageUrl } = action;
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        ids: union(meta.ids, action.response.result),
        isFetchingComments: false,
        nextPageUrl,
      },
    };
  }
  case FETCH_NEW_PARENT_COMMENT_SUCCESS: {
    // 자식코멘트면 추가하지 않아야한다.
    const id = action.commentId;
    const key = mapActionToKey(action);
    const meta = state[key];

    return {
      ...state,
      [key]: {
        ...meta,
        ids: union(meta.ids, [id]),
        isFetchingNewParentComment: false,
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
