import { schema as Schema } from 'normalizr';

const childCategorySchema = new Schema.Entity('categories', {},
  {
    idAttribute: category => category.name,
    processStrategy: (value, parent) => {
      const newCategory = { ...value };
      newCategory.parent = parent.name;
      return newCategory;
    },
  });

export const categorySchema = new Schema.Entity('categories',
  { children: [childCategorySchema] },
  { idAttribute: category => category.name });
