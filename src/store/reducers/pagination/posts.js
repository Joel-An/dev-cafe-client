import union from 'lodash/union';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_NEW_POST_REQUEST,
  FETCH_NEW_POST_SUCCESS,
  FETCH_NEW_POST_FAILURE,
  REMOVE_POST,
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
  case FETCH_POSTS_REQUEST: {
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
  case FETCH_POSTS_FAILURE: {
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
  case FETCH_POSTS_SUCCESS: {
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
  case REMOVE_POST: {
    const key = mapActionToKey(action);
    const meta = state[key];
    const { all } = state;

    const { postId } = action;

    let newState = state;

    if (all && all.ids.includes(postId)) {
      newState = {
        ...newState,
        all: {
          ...all,
          ids: all.ids.filter(id => id !== postId),
        },
      };
    }

    if (meta && meta.ids.includes(postId)) {
      newState = {
        ...newState,
        [key]: {
          ...meta,
          ids: meta.ids.filter(id => id !== postId),
        },
      };
    }

    return newState;
  }
  default:
    return state;
  }
};

export default postsByCategory;
