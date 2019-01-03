import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from '../types/categories';

import { CALL_API, Schemas } from '../sagas/apiSaga';

export const fetchCategories = (refreshCache = false) => ({
  type: CALL_API,
  types: [GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE],
  endpoint: '/categories',
  method: 'get',
  refreshCache,
  schema: Schemas.CATEGORY_ARRAY,
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

export const loadCategoriesSuccess = () => ({
  type: LOAD_CATEGORIES_SUCCESS,
});
