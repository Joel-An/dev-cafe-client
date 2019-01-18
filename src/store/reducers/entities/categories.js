import merge from 'lodash/merge';

const initialState = {};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_CATEGORY':
    return {
      ...state,
      [action.id]: {
        ...action.category,
      },
    };
  default:
    if (action.response && action.response.entities && action.response.entities.categories) {
      return merge({}, state, action.response.entities.categories);
    }
    return state;
  }
};

export default categoriesReducer;
