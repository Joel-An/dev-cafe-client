import { spawn } from 'redux-saga/effects';

import watchCategories from './categories';

export default function* root() {
  yield spawn(watchCategories);
}
