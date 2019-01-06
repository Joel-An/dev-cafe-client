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

export const userSchema = new Schema.Entity('users',
  {},
  { idAttribute: user => user._id });

export const postSchema = new Schema.Entity('posts',
  {
    author: userSchema,
  },
  {
    idAttribute: post => post._id,
    processStrategy: (post) => {
      const newPost = { ...post };
      newPost.category = post.category.name;

      return newPost;
    },
  });

const childCommentSchema = new Schema.Entity('comments',
  { author: userSchema },
  { idAttribute: comment => comment._id });


export const commentSchema = new Schema.Entity('comments',
  {
    children: [childCommentSchema],
    author: userSchema,
  },
  { idAttribute: comment => comment._id });
