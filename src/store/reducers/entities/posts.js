import merge from 'lodash/merge';

import {
  GET_POSTS_SUCCESS,
  FETCH_NEW_POST_SUCCESS,
  FETCH_POST_CONTENTS_SUCCESS,
} from '../../types/posts';

const addPost = (state, action) => {
  const posts = action.response.getEntity('posts');
  const { postId } = action;
  const post = posts[postId];

  return {
    ...state,
    [postId]: post,
  };
};

const postsReducer = (state = {}, action) => {
  switch (action.type) {
  case FETCH_POST_CONTENTS_SUCCESS: {
    return addPost(state, action);
  }
  case FETCH_NEW_POST_SUCCESS: {
    return addPost(state, action);
  }
  case GET_POSTS_SUCCESS: {
    const posts = action.response.getEntity('posts');
    return merge({}, state, posts);
  }
  default:
    return state;
  }
};

export default postsReducer;
