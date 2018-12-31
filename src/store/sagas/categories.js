import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';

import { LOAD_CATEGORIES, FETCH_CATEGORIES } from '../types/categories';
import * as actions from '../actions/categories';
import * as api from '../../api/categories';

function* fetchCategoriesSaga() {
  try {
    const { data } = yield call(api.getCategories);
    yield put(actions.fetchCategoriesFulfilled(data.categories));
  } catch (error) {
    yield put(actions.fetchCategoriesRejected(error.response));
  }
}

function* loadCategoriesSaga() {
  const state = yield select();
  if (state.categories.payload.length) {
    yield put(actions.loadCategoriesSuccess());
  } else {
    yield put(actions.newFetchCategoires());
    yield put(actions.fetchCategories());
  }
}

export default function* watchCategories() {
  yield takeLatest(LOAD_CATEGORIES, loadCategoriesSaga);
  yield takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga);
}
