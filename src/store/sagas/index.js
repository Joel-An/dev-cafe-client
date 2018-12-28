import {
  spawn, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_CATEGORIES } from '../types/categories';
import * as actions from '../actions/categories';

function* fetchCategoriesSaga() {
  try {
    const { data } = yield axios.get('api/v1/categories');
    yield put(actions.fetchCategoriesFulfilled(data.categories));
  } catch (error) {
    yield put(actions.fetchCategoriesRejected(error.response));
  }
}

function* watchBoard() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategoriesSaga);
}

export default function* root() {
  yield spawn(watchBoard);
}
