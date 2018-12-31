import { take, fork, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const childCategorySchema = new schema.Entity('categories', {},
  {
    idAttribute: category => category.name,
    processStrategy: (value, parent, key) => {
      value.parent = parent.name;
      return value;
    },
  });

const categorySchema = new schema.Entity('categories', {
  children: [childCategorySchema],
}, {
  idAttribute: category => category.name,
});


export const CALL_API = 'CALL_API';
export const Schemas = {
  CATEGORY_ARRAY: [categorySchema],
};

const API_URI = '/api/v1';

function normalizeData(response, schema) {
  const normalizedData = normalize(response.data.categories, schema);
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
      payload: normalizedData,
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
