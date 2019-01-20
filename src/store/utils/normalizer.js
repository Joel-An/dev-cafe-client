import { normalize } from 'normalizr';

import * as Schema from './schema';

const normalizeData = (data, schema) => normalize(data, schema);

export const normalizeCategories = (categories) => {
  const data = Array.isArray(categories) ? categories : [categories];
  return normalizeData(data, [Schema.categorySchema]);
};

export default normalizeData;
