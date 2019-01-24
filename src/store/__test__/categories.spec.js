/* eslint-disable no-undef */
import nock from 'nock';
import { expectRedux, storeSpy } from 'expect-redux';
import configureStore from '../index';

import * as actions from '../actions/categories';
import * as types from '../types/categories';
import { normalizeCategories } from '../utils/normalizer';
import { getCategories, getCategoryById } from '../selectors/categories';

expectRedux.configure({ betterErrorMessagesTimeout: 1000 });

class TestCategory {
  constructor({ name = 'default name', isChild = false, parent = null }) {
    this.name = name;
    this._id = `${name.trim()}_id`;
    this.isChild = isChild;
    this.parent = parent;
    this.children = [];
  }

  addChild(childId) {
    this.children.push(childId);
  }
}

const mockGetCategories = (categories) => {
  nock('http://localhost')
    .get('/api/v1/categories')
    .reply(200, categories);
};

const mockGetCategoryRequest = (category) => {
  nock('http://localhost')
    .get(`/api/v1/categories/${category._id}`)
    .reply(200, category);
};

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

function setupStore() {
  return configureStore([storeSpy]);
}

const mutateStoreForTest = (store, categories) => {
  const state = store.getState();
  state.newEntities.categories = JSON.parse(JSON.stringify(categories)); // deepCopy
};

describe('스토어 categories', () => {
  it('categories의 기본값은 빈 객체{} 다', () => {
    const store = setupStore();
    const categories = getCategories(store.getState());

    expect(categories).toEqual({});
  });

  describe('LOAD_CATEGORIES', () => {
    beforeEach(() => {
      mockGetCategories(categoriesResponse);
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('카테고리가 없으면 카테고리를 fetch한다', async () => {
      // Given
      const store = setupStore();

      const result = normalizeCategories(categoriesResponse);
      const normalizedCategories = result.selectCategories();

      // When
      store.dispatch(actions.loadCategories());

      // Then
      await expectRedux(store)
        .toDispatchAnAction()
        .ofType(types.GET_CATEGORIES_SUCCESS);

      await expectRedux(store)
        .toHaveState()
        .withSubtree(getCategories)
        .matching(normalizedCategories);
    });

    it('스토어에 카테고리정보가 있다면 fetch하지 않는다', async () => {
      // Given
      const store = setupStore();

      const fakeCategories = { C1: {}, C2: {} };
      mutateStoreForTest(store, fakeCategories);

      // When
      store.dispatch(actions.loadCategories());

      // Then
      await expectRedux(store)
        .toDispatchAnAction()
        .ofType(types.LOAD_CATEGORIES_SUCCESS);

      await expectRedux(store)
        .toNotDispatchAnAction()
        .ofType(types.GET_CATEGORIES_REQUEST);
    });
  });

  describe('GET_CATEGORY', () => {
    const newCategory = new TestCategory({ name: 'test' });

    const result = normalizeCategories(newCategory);
    const normalizedNewCategory = result.selectCategories();

    beforeEach(() => {
      mockGetCategoryRequest(newCategory);
    });

    beforeAll(() => {
      nock.cleanAll();
    });

    describe('카테고리가 없을 때', () => {
      it('GET_CATEGORY 요청이 성공하면 새로운 카테고리가 추가된다', async () => {
        // Given
        const store = setupStore();

        // When
        store.dispatch(actions.getCategory(newCategory._id));

        // Then
        await expectRedux(store)
          .toDispatchAnAction()
          .ofType(types.GET_CATEGORY_SUCCESS);

        await expectRedux(store)
          .toHaveState()
          .withSubtree(getCategories)
          .matching(normalizedNewCategory);
      });
    });

    describe('카테고리가 이미 존재할 때', () => {
      it('GET_CATEGORY 요청이 성공하면 새로운 카테고리가 추가된다', async () => {
        // Given
        const store = setupStore();

        const fakeCategories = { C1: {}, C2: {} };
        mutateStoreForTest(store, fakeCategories);

        // When
        store.dispatch(actions.getCategory(newCategory._id));

        // Then
        await expectRedux(store)
          .toDispatchAnAction()
          .ofType(types.GET_CATEGORY_SUCCESS);

        const expectedCategories = { ...fakeCategories, ...normalizedNewCategory };

        await expectRedux(store)
          .toHaveState()
          .withSubtree(getCategories)
          .matching(expectedCategories);
      });

      it('자식 카테고리 요청이 성공하면 부모 카테고리의 children도 갱신된다', async () => {
        // Given
        const store = setupStore();

        const parentCategory = new TestCategory({ name: 'parent' });

        const fakeCategories = { [parentCategory._id]: parentCategory };
        mutateStoreForTest(store, fakeCategories);

        const childCategory = new TestCategory({
          name: 'child',
          isChild: true,
          parent: parentCategory._id,
        });

        // When
        mockGetCategoryRequest(childCategory);
        store.dispatch(actions.getCategory(childCategory._id));

        // Then
        await expectRedux(store)
          .toDispatchAnAction()
          .ofType(types.GET_CATEGORY_SUCCESS);

        const storedParent = getCategoryById(store.getState(), parentCategory._id);

        expect(storedParent.children).toEqual([childCategory._id]);
      });
    });
  });

  describe('REMOVE_CATEGORY', () => {
    it('성공하면 해당 카테고리가 제거된다', async () => {
      // Given
      const store = setupStore();

      const fakeCategories = { C1: {}, C2: {} };
      mutateStoreForTest(store, fakeCategories);

      // When
      store.dispatch(actions.removeCategory('C1'));

      // Then
      await expectRedux(store)
        .toDispatchAnAction()
        .ofType(types.REMOVE_CATEGORY);

      const expectedCategories = { ...fakeCategories };
      delete expectedCategories.C1;

      await expectRedux(store)
        .toHaveState()
        .withSubtree(getCategories)
        .matching(expectedCategories);
    });
  });
});
