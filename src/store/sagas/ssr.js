import {
  put, all, take, race, takeEvery,
} from 'redux-saga/effects';

import { END } from 'redux-saga';

import {
  SSR_COMMON_PAGE,
  SSR_POST_PAGE,
  SSR_POST_LIST_PAGE,
} from '../types/ssr';

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_CONTENTS_FAILURE,
  FETCH_POST_CONTENTS_SUCCESS,
} from '../types/posts';

import {
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_SUCCESS,
} from '../types/comments';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../types/categories';

function* watchCategoriesLoaded() {
  const { success, failure } = yield race({
    success: take(FETCH_CATEGORIES_SUCCESS),
    failure: take(FETCH_CATEGORIES_FAILURE),
  });

  if (success) {
    return true;
  }

  return '카테고리 로딩 실패';
}

function* watchPostLoaded() {
  const { success, failure } = yield race({
    success: take(FETCH_POST_CONTENTS_SUCCESS),
    failure: take(FETCH_POST_CONTENTS_FAILURE),
  });

  if (success) {
    return true;
  }

  return '포스트 로딩 실패';
}

function* watchCommentsLoaded() {
  const { success, failure } = yield race({
    success: take(FETCH_COMMENTS_SUCCESS),
    failure: take(FETCH_COMMENTS_FAILURE),
  });

  if (success) {
    return true;
  }

  return '댓글 로딩 실패';
}

function* watchPostListLoaded() {
  const { success, failure } = yield race({
    success: take(FETCH_POSTS_SUCCESS),
    failure: take(FETCH_POSTS_FAILURE),
  });

  if (success) {
    return true;
  }

  return '글목록 로딩 실패';
}


function* ssrCommonPageSaga() {
  yield all([
    watchCategoriesLoaded(),
  ]);

  yield put(END);
}

const watchCommonPage = takeEvery(SSR_COMMON_PAGE, ssrCommonPageSaga);

function* ssrPostPageSaga() {
  yield all([
    watchCategoriesLoaded(),
    watchPostLoaded(),
    watchCommentsLoaded(),
  ]);

  yield put(END);
}

const watchPostPage = takeEvery(SSR_POST_PAGE, ssrPostPageSaga);


function* ssrPostListPageSaga() {
  yield all([
    watchCategoriesLoaded(),
    watchPostListLoaded(),
  ]);

  yield put(END);
}

const watchPostListPage = takeEvery(SSR_POST_LIST_PAGE, ssrPostListPageSaga);

const ssrSagas = [
  watchCommonPage,
  watchPostPage,
  watchPostListPage,
];

export default ssrSagas;
