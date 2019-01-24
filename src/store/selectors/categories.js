import { createSelector } from 'reselect';

export const getCategories = state => state.newEntities.categories;
// TODO: newEntities -> entities 변경

export const getCategoryById = (state, id) => getCategories(state)[id];

const getCategoryIds = createSelector(
  getCategories,
  categories => Object.keys(categories),
);

export const getParentCategoryIds = createSelector(
  [getCategories, getCategoryIds],
  (categories, categoryIds) => categoryIds.filter(id => !categories[id].isChild),
);
