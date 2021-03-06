import { schema as Schema } from 'normalizr';

const childCategorySchema = new Schema.Entity('categories', {},
  {
    idAttribute: category => category._id,
    processStrategy: (value, parent) => {
      const newCategory = { ...value };
      newCategory.parent = parent._id;
      return newCategory;
    },
  });

const categorySchema = new Schema.Entity('categories',
  { children: [childCategorySchema] },
  {
    idAttribute: category => category._id,
    processStrategy: (category) => {
      if (typeof category.children === 'undefined') {
        const newCategory = { ...category };
        newCategory.children = [];

        return newCategory;
      }
      return category;
    },
  });

const userSchema = new Schema.Entity('users',
  {},
  { idAttribute: user => user._id });

const postSchema = new Schema.Entity('posts',
  {
    author: userSchema,
  },
  {
    idAttribute: post => post._id,
    processStrategy: (post) => {
      const newPost = { ...post };
      newPost.category = post.category._id;

      return newPost;
    },
  });

const childCommentSchema = new Schema.Entity('comments',
  {
    author: userSchema,
    authorHeart: userSchema,
    likes: [userSchema],
    dislikes: [userSchema],
  },
  { idAttribute: comment => comment._id });


const commentSchema = new Schema.Entity('comments',
  {
    childComments: [childCommentSchema],
    author: userSchema,
    authorHeart: userSchema,
    likes: [userSchema],
    dislikes: [userSchema],
  },
  { idAttribute: comment => comment._id });


const Schemas = {
  CATEGORY: categorySchema,
  CATEGORY_ARRAY: [categorySchema],
  POST: postSchema,
  POST_ARRAY: [postSchema],
  COMMENT: commentSchema,
  COMMENT_ARRAY: [commentSchema],
};

export default Schemas;
