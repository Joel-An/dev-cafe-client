import { createSelector } from 'reselect';

export const getCategories = state => state.newEntities.categories;
// TODO: newEntities -> entities 변경

const getCategoryIds = createSelector(
  getCategories,
  categories => Object.keys(categories),
);

export const getParentCategoryIds = createSelector(
  [getCategories, getCategoryIds],
  (categories, categoryIds) => categoryIds.filter(id => !categories[id].isChild),
);
