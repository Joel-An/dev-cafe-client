import merge from 'lodash/merge';

import {
  GET_POSTS_SUCCESS,
  GET_POST_SUCCESS,
} from '../../types/posts';

const postsReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_POST_SUCCESS: {
    const posts = action.response.getEntity('posts');
    const { postId } = action;
    const post = posts[postId];

    return {
      ...state,
      [postId]: post,
    };
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
