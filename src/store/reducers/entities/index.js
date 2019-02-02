import { combineReducers } from 'redux';

import categories from './categories';
import users from './users';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  categories, users, posts, comments,
});
