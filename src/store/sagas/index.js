import { spawn } from 'redux-saga/effects';

import watchCategories from './categories';
import watchPosts from './posts';
import watchComments from './comments';
import auth from './auth';
import watchCallApi from './apiSaga';

export default function* root() {
  yield spawn(watchCategories);
  yield spawn(watchComments);
  yield spawn(watchPosts);
  yield spawn(auth.loginFlow);
  yield spawn(auth.logoutFlow);
  yield spawn(auth.watchFetchUserInfo);
  yield spawn(watchCallApi);
}
