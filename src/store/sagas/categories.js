import {
  put, takeEvery, call,
} from 'redux-saga/effects';

import { FETCH_CATEGORIES } from '../types/categories';
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

export default function* watchCategories() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategoriesSaga);
}
