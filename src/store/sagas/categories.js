import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import { LOAD_CATEGORIES } from '../types/categories';
import * as actions from '../actions/categories';


function* loadCategoriesSaga() {
  const state = yield select();
  if (Object.keys(state.entities.categories).length) {
    yield put(actions.loadCategoriesSuccess());
  } else {
    yield put(actions.fetchCategories());
  }
}

export default function* watchCategories() {
  yield takeLatest(LOAD_CATEGORIES, loadCategoriesSaga);
}
