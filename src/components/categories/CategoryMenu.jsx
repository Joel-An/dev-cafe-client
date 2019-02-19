import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withCategoriesContainer from '../../containers/CategoriesContainer';
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

const Category = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string, // default: null
  isChild: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
});

CategoryMenu.propTypes = {
  categories: PropTypes.objectOf(Category).isRequired,
  parentCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
};

CategoryMenu.defaultProps = {
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
};

export default connectComponent(CategoryMenu,
  [
    withLastVisitedCategoryId,
    withCategoriesContainer,
  ]);
