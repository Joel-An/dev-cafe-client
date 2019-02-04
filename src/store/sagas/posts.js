import {
  put, takeLatest, select, spawn, takeEvery,
} from 'redux-saga/effects';

import * as Actions from '../actions/posts';
import * as Types from '../types/posts';
import * as Selectors from '../selectors/posts';


function* loadPostsSaga(action) {
  const state = yield select();
  const { category } = action;
  const cache = state.pagination.postsByCategory[category];

  if (cache) {
    yield put(Actions.loadPostsSuccess());
  } else {
    yield put(Actions.fetchPosts(category));
  }
}

function* watchLoadPosts() {
  yield takeLatest(Types.LOAD_POSTS, loadPostsSaga);
}


function* loadPostSaga(action) {
  const state = yield select();
  const { postId } = action;
  const cache = state.entities.posts[postId] && state.entities.posts[postId].contents;

  if (cache) {
    yield put(Actions.loadPostSuccess());
  } else {
    yield put(Actions.fetchPostContents(postId));
  }
}

function* watchLoadPost() {
  yield takeLatest(Types.LOAD_POST, loadPostSaga);
}

function* loadEditingPost(action) {
  const state = yield select();
  const { postId } = action;

  const cache = Selectors.selectEditingPostById(state, postId);

  if (!cache) {
    const post = Selectors.selectPostById(state, postId);
    yield put(Actions.startEditingPost(post));
  }
}

function* watchLoadEditingPost() {
  yield takeEvery(Types.LOAD_EDITING_POST, loadEditingPost);
}

export default function* watchPosts() {
  yield spawn(watchLoadPost);
  yield spawn(watchLoadPosts);
  yield spawn(watchLoadEditingPost);
}
