import { all } from 'redux-saga/effects';

import categoriesSagas from './categories';
import postsSagas from './posts';
import commentsSagas from './comments';
import notificationsSagas from './notifications';
import authSagas from './auth';
import apiSagas from './apiSaga';

import ssr from './ssr';

const noop = [];
const ssrSagas = process.env.BROWSER ? noop : ssr;

export default function* root() {
  yield all([
    ...categoriesSagas,
    ...apiSagas,
    ...commentsSagas,
    ...postsSagas,
    ...authSagas,
    ...notificationsSagas,
    ...ssrSagas,
  ]);
}
