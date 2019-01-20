import { combineReducers } from 'redux';

import categories from './categories';
import users from './users';

export default combineReducers({
  categories, users,
});
