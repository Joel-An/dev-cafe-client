import { normalize } from 'normalizr';

import Schemas from './schema';

const normalizeData = (data, schema) => {
  const normalizedData = normalize(data, schema);

  normalizedData.getEntity = entityName => normalizedData.entities[entityName];
  normalizedData.hasEntity = entityName => (!!normalizedData.entities[entityName]);
  return normalizedData;
};

export const normalizeCategories = (categories) => {
  const data = Array.isArray(categories) ? categories : [categories];

  const result = normalizeData(data, Schemas.CATEGORY_ARRAY);
  result.selectCategories = () => result.getEntity('categories');
  return result;
};

export default normalizeData;
