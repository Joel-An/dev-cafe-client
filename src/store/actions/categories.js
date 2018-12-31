import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from '../types/categories';

import { CALL_API, Schemas } from '../sagas/apiSaga';

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const newFetchCategoires = () => ({
  type: CALL_API,
  types: [CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE],
  endpoint: '/categories',
  method: 'get',
  schema: Schemas.CATEGORY_ARRAY,
});

export const fetchCategoriesFulfilled = categories => ({
  type: FETCH_CATEGORIES_FULFILLED,
  payload: categories,
});

export const fetchCategoriesRejected = error => ({
  type: FETCH_CATEGORIES_REJECTED,
  error,
});


export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

export const loadCategoriesSuccess = categories => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload: categories,
});
