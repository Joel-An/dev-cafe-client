import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import { LOAD_POSTS } from '../types/posts';
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

export default function* watchPosts() {
  yield takeLatest(LOAD_POSTS, loadPostsSaga);
}
