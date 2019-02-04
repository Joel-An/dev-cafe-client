import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import { LOAD_POSTS, LOAD_POST } from '../types/posts';
import * as actions from '../actions/posts';


function* loadPostsSaga(action) {
  const state = yield select();
  const { category } = action;
  const cache = state.pagination.postsByCategory[category];

  if (cache) {
    yield put(actions.loadPostsSuccess());
  } else {
    yield put(actions.fetchPosts(category));
  }
}

export function* watchPosts() {
  yield takeLatest(LOAD_POSTS, loadPostsSaga);
}


function* loadPostSaga(action) {
  const state = yield select();
  const { postId } = action;
  const cache = state.entities.posts[postId] && state.entities.posts[postId].contents;

  if (cache) {
    yield put(actions.loadPostSuccess());
  } else {
    yield put(actions.fetchPostContents(postId));
  }
}

export function* watchPost() {
  yield takeLatest(LOAD_POST, loadPostSaga);
}
