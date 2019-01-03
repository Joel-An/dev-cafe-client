import {
  LOAD_CATEGORIES,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from '../types/categories';

import { CALL_API, Schemas } from '../sagas/apiSaga';

export const fetchCategories = () => ({
  type: CALL_API,
  types: [CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE],
  endpoint: '/categories',
  method: 'get',
  schema: Schemas.CATEGORY_ARRAY,
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});
