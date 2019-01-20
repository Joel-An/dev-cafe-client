import merge from 'lodash/merge';

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    if (action.response && action.response.hasEntity('users')) {
      return merge({}, state, action.response.getEntity('users'));
    }
    return state;
  }
};

export default usersReducer;
