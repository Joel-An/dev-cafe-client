import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import { LOAD_COMMENTS } from '../types/comments';
import * as actions from '../actions/comments';


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

export default function* watchComments() {
  yield takeLatest(LOAD_COMMENTS, loadCommentsSaga);
}
