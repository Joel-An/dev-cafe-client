import { combineReducers } from 'redux';

import categories from './categories';
import users from './users';
import posts from './posts';

export default combineReducers({
  categories, users, posts,
});
