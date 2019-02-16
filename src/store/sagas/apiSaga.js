import {
  put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import normalizeData from '../utils/normalizer';

export const CALL_API = 'CALL_API';

const API_URI = '/api/v1';

function* callApi(action) {
  const {
    method, types, schema,
  } = action;

  const endpoint = typeof action.endpoint === 'function'
    ? action.endpoint()
    : API_URI + action.endpoint;

  const [requestType, successType, failureType] = types;

  const actionWith = (type) => {
    const newAction = Object.assign({}, action, type);
    return newAction;
  };

  yield put(actionWith({ type: requestType }));

  try {
    const response = yield axios[method](endpoint);
    const normalizedData = normalizeData(response.data, schema);
    yield put(actionWith({
      type: successType,
      response: normalizedData,
      nextPageUrl: response.headers['next-page-url'] || false,
    }));
  } catch (err) {
    yield put(actionWith({
      type: failureType,
      error: err.response.data.message || 'Something bad happened',
      statusCode: err.response.status,
    }));
  }
}

const watchCallApi = takeEvery(CALL_API, callApi);

const apiSagas = [
  watchCallApi,
];

export default apiSagas;
