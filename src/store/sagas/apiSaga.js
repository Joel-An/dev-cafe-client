import { take, fork, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import axios from 'axios';

import { categorySchema, postSchema, commentSchema } from './schema';


export const CALL_API = 'CALL_API';
export const Schemas = {
  CATEGORY: categorySchema,
  CATEGORY_ARRAY: [categorySchema],
  POST: postSchema,
  POST_ARRAY: [postSchema],
  COMMENT_ARRAY: [commentSchema],
};

const API_URI = '/api/v1';

function normalizeData(response, schema) {
  const normalizedData = normalize(response.data, schema);
  return normalizedData;
}

function* callApi(action) {
  const {
    method, types, schema,
  } = action;

  const endpoint = API_URI + action.endpoint;

  const [requestType, successType, failureType] = types;

  const actionWith = (type) => {
    const newAction = Object.assign({}, action, type);
    return newAction;
  };

  yield put(actionWith({ type: requestType }));

  try {
    const response = yield axios[method](endpoint);
    const normalizedData = normalizeData(response, schema);
    yield put(actionWith({
      type: successType,
      response: normalizedData,
    }));
  } catch (err) {
    yield put(actionWith({
      type: failureType,
      error: err.message || 'Something bad happened',
    }));
  }
}

function* watchCallApi() {
  while (true) {
    const action = yield take(CALL_API);
    yield fork(callApi, action);
  }
}

export default watchCallApi;
