import {
  put, takeLatest, select, takeEvery,
} from 'redux-saga/effects';

import * as Actions from '../actions/posts';
import * as Types from '../types/posts';
import * as Selectors from '../selectors/posts';


function* loadPostsSaga(action) {
  const state = yield select();
  const { category } = action;
  const postsMeta = state.pagination.postsByCategory[category];
  const cache = postsMeta && postsMeta.ids.length > 0;

  if (cache) {
    yield put(Actions.loadPostsSuccess());
  } else {
    yield put(Actions.fetchPosts(category));
  }
}

const watchLoadPosts = takeLatest(Types.LOAD_POSTS, loadPostsSaga);


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

const watchLoadPost = takeLatest(Types.LOAD_POST, loadPostSaga);

function* loadEditingPost(action) {
  const state = yield select();
  const { postId } = action;

  const cache = Selectors.selectEditingPostById(state, postId);

  if (!cache) {
    const post = Selectors.selectPostById(state, postId);
    yield put(Actions.startEditingPost(post));
  }
}

const watchLoadEditingPost = takeEvery(Types.LOAD_EDITING_POST, loadEditingPost);

function* checkCacheAndUpdate(action) {
  const state = yield select();
  const { postId } = action;
  const cache = Selectors.selectPostById(state, postId);

  if (cache) {
    yield put(Actions.fetchUpdatedPost(postId));
  }
}

const watchCheckCacheAndUpdate = takeEvery(Types.CHECK_CACHE_AND_UPDATE_POST, checkCacheAndUpdate);

const postsSagas = [
  watchLoadPosts,
  watchLoadPost,
  watchLoadEditingPost,
  watchCheckCacheAndUpdate,
];

export default postsSagas;
