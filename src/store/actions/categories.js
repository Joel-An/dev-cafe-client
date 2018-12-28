import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
} from '../types/categories';

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const fetchCategoriesFulfilled = categories => ({
  type: FETCH_CATEGORIES_FULFILLED,
  payload: categories,
});

export const fetchCategoriesRejected = error => ({
  type: FETCH_CATEGORIES_REJECTED,
  error,
});
