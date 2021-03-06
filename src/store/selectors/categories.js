import { createSelector } from 'reselect';

export const getCategories = state => state.entities.categories;

export const getCategoryById = (state, id) => getCategories(state)[id];

const getCategoryIds = createSelector(
  getCategories,
  categories => Object.keys(categories),
);

export const getParentCategoryIds = createSelector(
  [getCategories, getCategoryIds],
  (categories, categoryIds) => categoryIds.filter(id => !categories[id].isChild),
);

export const selectLastVisitedCategoryId = state => state.history.lastVisitedCategory;
