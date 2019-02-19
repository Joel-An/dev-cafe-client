import React from 'react';
import { Link } from 'react-router-dom';

import withCategoriesContainer, { CategoriesContainerPropTypes, CategoriesContainerDefaultProps } from '../../containers/CategoriesContainer';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent } from '../../utils';

import './CategoryMenu.scss';

const checkSelected = (categoryId, lastVisited) => (categoryId === lastVisited ? 'selected' : 'none');

const renderCategory = (category, lastVisitedId) => (
  <Link to={{
    pathname: '/posts',
    search: `category=${category._id}`,
  }}
  style={{ textDecoration: 'none' }}
  className={checkSelected(category._id, lastVisitedId)}
  >
    {category.name}
  </Link>
);

const rederSubCategories = (categories, id, lastVisitedCategoryId) => {
  const parent = categories[id];
  if (!parent.children.length) {
    return null;
  }

  return (
    <ul className="SubCategoryList">
      {parent.children.map(childId => (
        <li key={childId} name={categories[childId].name}>
          {renderCategory(categories[childId], lastVisitedCategoryId)}
        </li>))}
    </ul>
  );
};

const CategoryMenu = ({ categories, parentCategoryIds, lastVisitedCategoryId }) => {
  const isEmpty = !parentCategoryIds.length;

  return (
    <nav className="CategoryMenu">
      <ul className="CategoryList">
        <li key="categoryAll" name="전체보기">
          <Link
            to="/posts?category=all"
            style={{ textDecoration: 'none' }}
            className={checkSelected('all', lastVisitedCategoryId)}
          >
            전체 보기
          </Link>
        </li>
        {isEmpty
          ? <p>Loading...</p>
          : parentCategoryIds.map(id => (
            <li key={id} name={categories[id].name}>
              {renderCategory(categories[id], lastVisitedCategoryId)}
              {rederSubCategories(categories, id, lastVisitedCategoryId)}
            </li>
          ))}
      </ul>
    </nav>
  );
};

CategoryMenu.propTypes = {
  categories: CategoriesContainerPropTypes.categories,
  parentCategoryIds: CategoriesContainerPropTypes.parentCategoryIds,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
};

CategoryMenu.defaultProps = {
  categories: CategoriesContainerDefaultProps.categories,
  parentCategoryIds: CategoriesContainerDefaultProps.parentCategoryIds,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
};

export default connectComponent(CategoryMenu,
  [
    withLastVisitedCategoryId,
    withCategoriesContainer,
  ]);
