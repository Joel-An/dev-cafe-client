/* eslint-disable no-undef */
import nock from 'nock';
import { expectRedux, storeSpy } from 'expect-redux';
import configureStore from '../index';

import * as actions from '../actions/categories';
import * as types from '../types/categories';
import normalizeData from '../utils/normalizer';
import { categorySchema } from '../sagas/schema';

const categoriesResponse = [
  {
    _id: '5c1f8f78bbfd51296cb0ba8b',
    parent: null,
    isChild: false,
    name: '자바',
    children: [
      {
        _id: '5c1f8f7fbbfd51296cb0ba8c',
        parent: '5c1f8f78bbfd51296cb0ba8b',
        isChild: true,
        name: '스크립트',
        children: [],
      },
    ],
  },
];

const { entities } = normalizeData(categoriesResponse, [categorySchema]);
const normalizedCategories = entities.categories;

const categoriesSelector = state => state.entities.categories;

let store;

function setupStore() {
  store = configureStore([storeSpy]);
}
beforeAll(() => {
  setupStore();
});

describe('state.entities.categories', () => {
  beforeAll(() => {
    nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, categoriesResponse);
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('LOAD_CATEGORIES -> 스토어에 카테고리가 저장된다', async () => {
    expectRedux.configure({ betterErrorMessagesTimeout: 1000 });

    store.dispatch(actions.loadCategories());

    await expectRedux(store)
      .toDispatchAnAction()
      .ofType(types.GET_CATEGORIES_SUCCESS);

    await expectRedux(store)
      .toHaveState()
      .withSubtree(categoriesSelector)
      .matching(normalizedCategories);
  });

  describe('스토어에 카테고리가 있다면', () => {
    it('LOAD_CATEGORIES -> LOAD_CATEGORIES_SUCCESS', async () => {
      store.dispatch(actions.loadCategories());

      await expectRedux(store)
        .toDispatchAnAction()
        .ofType(types.LOAD_CATEGORIES_SUCCESS);

      // TODO: fetchCategories.should.have.not.called
    });
  });
});
