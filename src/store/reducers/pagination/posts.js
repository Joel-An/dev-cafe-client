import union from 'lodash/union';
import {
  GET_POSTS_REQUEST,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  FETCH_NEW_POST_REQUEST,
  FETCH_NEW_POST_SUCCESS,
  FETCH_NEW_POST_FAILURE,
} from '../../types/posts';

const mapActionToKey = action => action.category;

const initialState = {
  all: {
    isFetching: false,
    ids: [],
    error: false,
    nextPageUrl: null,
  },
};

const postsByCategory = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_NEW_POST_REQUEST:
  case GET_POSTS_REQUEST: {
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
  case FETCH_NEW_POST_FAILURE:
  case GET_POSTS_FAILURE: {
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
  case GET_POSTS_SUCCESS: {
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
  case FETCH_NEW_POST_SUCCESS: {
    const key = mapActionToKey(action);
    const meta = state[key];
    const { postId } = action;
    return {
      ...state,
      all: {
        ...state.all,
        ids: union([postId], state.all.ids),
      },
      [key]: {
        ...meta,
        ids: union([postId], meta.ids),
        isFetching: false,
      },
    };
  }
  default:
    return state;
  }
};

export default postsByCategory;
