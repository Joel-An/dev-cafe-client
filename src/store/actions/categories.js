import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
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


export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

export const loadCategoriesSuccess = categories => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload: categories,
});
