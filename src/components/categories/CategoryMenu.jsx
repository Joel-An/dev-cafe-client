import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withCategoriesContainer from '../../containers/CategoriesContainer';

import './CategoryMenu.scss';

const renderCategory = category => (
  <Link to={{
    pathname: '/posts',
    search: `category=${category._id}`,
  }}>
    {category.name}
  </Link>
);

const rederSubCategories = (categories, id) => {
  const parent = categories[id];
  if (!parent.children.length) {
    return null;
  }
  const style = { paddingLeft: '10px' };

  return (
    <ul className="subCategoryList">
      {parent.children.map(childId => (
        <li key={childId} name={categories[childId].name} style={style}>
          {renderCategory(categories[childId])}
        </li>))}
    </ul>
  );
};

const CategoryMenu = ({ categories, parentCategoryIds }) => {
  const isEmpty = !parentCategoryIds.length;

  return (
    <nav className="CategoryMenu">
      <ul className="CategoryList">
        <li key="categoryAll" name="전체보기">
          <Link to="/posts?category=all">전체 보기</Link>
        </li>
        {isEmpty
          ? <p>Loading...</p>
          : parentCategoryIds.map(id => (
            <li key={id} name={categories[id].name}>
              {renderCategory(categories[id])}
              {rederSubCategories(categories, id)}
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
};


export default withCategoriesContainer(CategoryMenu);
