import { normalize } from 'normalizr';

import * as Schema from './schema';

const normalizeData = (data, schema) => normalize(data, schema);

export const normalizeCategories = (categories) => {
  const data = Array.isArray(categories) ? categories : [categories];

  const result = normalizeData(data, [Schema.categorySchema]);

  result.selectCategories = () => result.entities.categories;
  return result;
};

export default normalizeData;
