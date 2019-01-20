import { createSelector } from 'reselect';

export const getCategories = state => state.newEntities.categories;
// TODO: newEntities -> entities 변경

const getCategoryNames = createSelector(
  getCategories,
  categories => Object.keys(categories),
);

export const getParentCategoryNames = createSelector(
  [getCategories, getCategoryNames],
  (categories, categoryNames) => categoryNames.filter(name => !categories[name].isChild),
);
