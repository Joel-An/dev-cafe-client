import merge from 'lodash/merge';

import {
  FETCH_MYINFO_SUCCESS,
} from '../../types/auth';

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_MYINFO_SUCCESS: {
    const user = action.payload;
    return { ...state, [user._id]: { ...user } };
  }
  default:
    if (action.response && action.response.hasEntity('users')) {
      return merge({}, state, action.response.getEntity('users'));
    }
    return state;
  }
};

export default usersReducer;
