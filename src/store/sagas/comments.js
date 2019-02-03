import {
  put, takeLatest, takeEvery, select, spawn,
} from 'redux-saga/effects';

import * as types from '../types/comments';

import * as actions from '../actions/comments';
import { selectCommentById } from '../selectors/comments';


function* loadCommentsSaga(action) {
  const state = yield select();
  const { postId } = action;
  const cache = state.pagination.commentsByPost[postId];
  if (cache) {
    yield put(actions.loadCommentsSuccess());
  } else {
    yield put(actions.fetchComments(postId));
  }
}

function* watchLoadComments() {
  yield takeLatest(types.LOAD_COMMENTS, loadCommentsSaga);
}

function* checkCacheAndUpdate(action) {
  const state = yield select();
  const { commentId } = action;
  const cache = selectCommentById(state, commentId);

  if (cache) {
    yield put(actions.fetchUpdatedComment(commentId));
  }
}

function* watchCheckCacheAndUpdate() {
  yield takeEvery(types.CHECK_CACHE_AND_UPDATE_COMMENT, checkCacheAndUpdate);
}

export default function* watchComments() {
  yield spawn(watchLoadComments);
  yield spawn(watchCheckCacheAndUpdate);
}
