import { createSelector } from 'reselect';

export const getCategories = state => state.entities.categories;

const getCategoryNames = createSelector(
  getCategories,
  categories => Object.keys(categories),
);

export const getParentCategoryNames = createSelector(
  [getCategories, getCategoryNames],
  (categories, categoryNames) => categoryNames.filter(name => !categories[name].isChild),
);
