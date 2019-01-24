import merge from 'lodash/merge';

import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  REMOVE_CATEGORY,
} from '../../types/categories';

// 카테고리 삭제
const removeFromParent = (state, child) => {
  const parent = state[child.parent];

  if (parent.children.includes(child._id)) {
    const newChildren = parent.children.filter(id => id !== child._id);
    const newParent = { ...parent, children: newChildren };
    return { ...state, [newParent._id]: { ...newParent } };
  }
  return state;
};

const removeCategory = (state, id) => {
  const category = state[id];

  const newState = category.isChild ? removeFromParent(state, category) : { ...state };
  delete newState[id];
  return newState;
};


// 카테고리 추가
const addToParent = (state, child) => {
  const parent = state[child.parent];
  if (!parent.children.includes(child._id)) {
    const newChildren = [...parent.children, child._id];
    const newParent = { ...parent, children: newChildren };

    return { ...state, [newParent._id]: { ...newParent } };
  }
  return state;
};

const addCategory = (state, action) => {
  const id = action.categoryId;
  const categories = action.response.getEntity('categories');
  const category = categories[id];

  const newState = { ...state, [id]: category };

  if (category.isChild) {
    return addToParent(newState, category);
  }

  return newState;
};

const initialState = {};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CATEGORY_SUCCESS:
    return addCategory(state, action);
  case GET_CATEGORIES_SUCCESS:
    return merge({}, state, action.response.getEntity('categories'));
  case REMOVE_CATEGORY: {
    const id = action.payload;
    return removeCategory(state, id);
  }
  default:
    return state;
  }
};

export default categoriesReducer;
