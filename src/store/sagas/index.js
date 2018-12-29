import { spawn } from 'redux-saga/effects';

import watchCategories from './categories';
import auth from './auth';

export default function* root() {
  yield spawn(watchCategories);
  yield spawn(auth.loginFlow);
  yield spawn(auth.logoutFlow);
  yield spawn(auth.watchFetchUserInfo);
}
