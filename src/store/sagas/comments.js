import {
  put, takeLatest, takeEvery, select,
} from 'redux-saga/effects';

import * as Types from '../types/comments';
import * as Actions from '../actions/comments';
import * as Selectors from '../selectors/comments';


function* loadCommentsSaga(action) {
  const state = yield select();
  const { postId } = action;
  const cache = state.pagination.commentsByPost[postId];
  if (cache) {
    yield put(Actions.loadCommentsSuccess());
  } else {
    yield put(Actions.fetchComments(postId));
  }
}

const watchLoadComments = takeLatest(Types.LOAD_COMMENTS, loadCommentsSaga);

function* checkCacheAndUpdate(action) {
  const state = yield select();
  const { commentId } = action;
  const cache = Selectors.selectCommentById(state, commentId);

  if (cache) {
    yield put(Actions.fetchUpdatedComment(commentId));
  }
}

const watchCheckCacheAndUpdate = takeEvery(
  Types.CHECK_CACHE_AND_UPDATE_COMMENT,
  checkCacheAndUpdate,
);

function* loadEditingComment(action) {
  const state = yield select();
  const { commentId } = action;

  const cache = Selectors.selectEditingCommentById(state, commentId);

  if (!cache) {
    const comment = Selectors.selectCommentById(state, commentId);
    yield put(Actions.startEditingComment(comment));
  }
}

const watchLoadEditingComment = takeEvery(Types.LOAD_EDITING_COMMENT, loadEditingComment);

const commentsSagas = [
  watchLoadComments,
  watchCheckCacheAndUpdate,
  watchLoadEditingComment,
];

export default commentsSagas;
