import {
  put, takeEvery, call,
} from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_CATEGORIES } from '../types/categories';
import * as actions from '../actions/categories';

function* fetchCategoriesSaga() {
  try {
    const { data } = yield call(axios.get, 'api/v1/categories');
    yield put(actions.fetchCategoriesFulfilled(data.categories));
  } catch (error) {
    yield put(actions.fetchCategoriesRejected(error.response));
  }
}

export default function* watchCategories() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategoriesSaga);
}
