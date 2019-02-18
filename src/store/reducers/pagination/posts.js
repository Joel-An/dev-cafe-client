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

const getDefaultMeta = () => ({
  isFetchingNewPost: false,
  isFetchingPosts: false,
  ids: [],
  pages: [],
  error: false,
  nextPageUrl: false,
});


const postsByCategory = (state = {}, action) => {
  switch (action.type) {
  case FETCH_NEW_POST_REQUEST: {
    const key = mapActionToKey(action);
    const meta = state[key];

    const all = state.all || getDefaultMeta();

    if (meta) {
      return {
        ...state,
        all: { ...all, isFetchingNewPost: true },
        [key]: { ...meta, isFetchingNewPost: true },
      };
    }
    const defaultMeta = getDefaultMeta();
    return {
      ...state,
      all: { ...all, isFetchingNewPost: true },
      [key]: { ...defaultMeta, isFetchingNewPost: true },
    };
  }
  case FETCH_POSTS_REQUEST: {
    const key = mapActionToKey(action);
    const meta = state[key];
    if (meta) {
      return {
        ...state,
        [key]: { ...meta, isFetchingPosts: true },
      };
    }
    const defaultMeta = getDefaultMeta();
    return {
      ...state,
      [key]: { ...defaultMeta, isFetchingPosts: true },
    };
  }
  case FETCH_NEW_POST_FAILURE: {
    const key = mapActionToKey(action);
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        error: action.error,
        isFetchingNewPost: false,
      },
    };
  }
  case FETCH_POSTS_FAILURE: {
    const key = mapActionToKey(action);
    const { statusCode } = action;
    const meta = state[key];
    return {
      ...state,
      [key]: {
        ...meta,
        error: action.error,
        isFetchingPosts: false,
        nextPageUrl: statusCode === 404 ? false : meta.nextPageUrl,
      },
    };
  }
  case FETCH_POSTS_SUCCESS: {
    const key = mapActionToKey(action);
    const { nextPageUrl } = action;
    const meta = state[key];
    const newPostIds = action.response.result;
    const [firstPostId] = newPostIds;

    return {
      ...state,
      [key]: {
        ...meta,
        ids: union(meta.ids, newPostIds),
        pages: meta.pages.concat([firstPostId]),
        isFetchingPosts: false,
        nextPageUrl,
      },
    };
  }
  case FETCH_NEW_POST_SUCCESS: {
    const key = mapActionToKey(action);
    const meta = state[key];
    const { postId } = action;

    const { all } = state;

    let nextPageUrlForAll = all.nextPageUrl;
    let nextPageUrlForMeta = meta.nextPageUrl;

    if (all.ids.length === 0) {
      nextPageUrlForAll = `/api/v1/posts?before=${postId}`;
    }

    if (meta.ids.length === 0) {
      nextPageUrlForMeta = `/api/v1/posts?before=${postId}&category=${key}`;
    }

    return {
      ...state,
      all: {
        ...all,
        ids: union([postId], all.ids),
        isFetchingNewPost: false,
        nextPageUrl: nextPageUrlForAll,
      },
      [key]: {
        ...meta,
        ids: union([postId], meta.ids),
        isFetchingNewPost: false,
        nextPageUrl: nextPageUrlForMeta,
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
