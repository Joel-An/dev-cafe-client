import { all } from 'redux-saga/effects';

import categoriesSagas from './categories';
import postsSagas from './posts';
import commentsSagas from './comments';
import notificationsSagas from './notifications';
import authSagas from './auth';
import apiSagas from './apiSaga';

export default function* root() {
  yield all([
    ...categoriesSagas,
    ...apiSagas,
    ...commentsSagas,
    ...postsSagas,
    ...authSagas,
    ...notificationsSagas,
  ]);
}
