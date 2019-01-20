import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import {
  LOAD_CATEGORIES,
  GET_CATEGORY_REQUEST,
} from '../types/categories';
import * as actions from '../actions/categories';

import * as Api from '../../api/categories';
import { normalizeCategories } from '../utils/normalizer';

function* getCategorySaga(action) {
  const id = action.payload;
  try {
    const category = yield Api.getCategory(id);
    const normalizedCategory = normalizeCategories(category);
    yield put(actions.getCategorySuccess(normalizedCategory));
  } catch (err) {
    yield put(actions.getCategoryFailure(err));
  }
}

export function* getCategoryWatcher() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategorySaga);
}

function* loadCategoriesSaga() {
  const state = yield select();
  if (Object.keys(state.entities.categories).length) {
    yield put(actions.loadCategoriesSuccess());
  } else {
    yield put(actions.fetchCategories());
  }
}

export function* watchCategories() {
  yield takeLatest(LOAD_CATEGORIES, loadCategoriesSaga);
}
