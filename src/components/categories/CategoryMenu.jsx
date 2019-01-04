import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const renderCategory = category => (
  <Link to={{
    pathname: '/posts',
    search: `category=${category._id}`,
  }}>
    {category.name}
  </Link>
);

const rederSubCategories = (categories, name) => {
  const parent = categories[name];
  if (!parent.children.length) {
    return null;
  }
  const style = { paddingLeft: '10px' };

  return (
    <ul className="subCategoryList">
      {parent.children.map(childName => (
        <li key={categories[childName]._id} name={childName} style={style}>
          {renderCategory(categories[childName])}
        </li>))}
    </ul>
  );
};

const CategoryMenu = ({ categories, parentCategoryNames }) => {
  const isEmpty = !parentCategoryNames.length;

  return (
    <ul className="categoryList">
      <li key="categoryAll" name="전체보기">
        <Link to="/posts?category=all">전체 보기</Link>
      </li>
      {isEmpty
        ? <p>Loading...</p>
        : parentCategoryNames.map(name => (
          <li key={categories[name]._id} name={name}>
            {renderCategory(categories[name])}
            {rederSubCategories(categories, name)}
          </li>
        ))}
    </ul>

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
  parentCategoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default CategoryMenu;
