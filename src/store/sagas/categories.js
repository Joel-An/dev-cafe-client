import {
  put, takeLatest, select,
} from 'redux-saga/effects';

import {
  LOAD_CATEGORIES,
} from '../types/categories';
import * as actions from '../actions/categories';
import { getCategories } from '../selectors/categories';


function* loadCategoriesSaga() {
  const categories = yield select(getCategories);
  if (Object.keys(categories).length) {
    yield put(actions.loadCategoriesSuccess());
  } else {
    yield put(actions.fetchCategories());
  }
}
const watchCategories = takeLatest(LOAD_CATEGORIES, loadCategoriesSaga);

const categoriesSagas = [
  watchCategories,
];

export default categoriesSagas;
