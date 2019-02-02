import { combineReducers } from 'redux';

import postsByCategory from './posts';
import commentsByPost from './comments';

export default combineReducers({
  postsByCategory, commentsByPost,
});
