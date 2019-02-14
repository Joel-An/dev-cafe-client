import React from 'react';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';
import DeleteCategory from './DeleteCategory';
import withCategoriesContainer from '../../containers/CategoriesContainer';

import './CategoryManager.scss';

const renderChildCategories = (categories, id) => {
  if (categories[id].children.length === 0) {
    return null;
  }

  return (
    <ul className="subCategoryList">
      {categories[id].children.map(childId => (
        <li name={categories[childId].name} key={childId}>
          <div className="category">
            <span className="title">
            ㄴ{categories[childId].name}
            </span>
            <DeleteCategory
              id={childId}
            />
          </div>
        </li>
      ))
      }
    </ul>
  );
};

const CategoryManager = (props) => {
  const { categories, parentCategoryIds } = props;

  return (
    <div className="CategoryManager">
      <ul className="categoryList">
        {parentCategoryIds.map(id => (
          <li name={categories[id].name} key={id}>
            <div className="category">
              <span className="title">
                {categories[id].name}
              </span>
              <DeleteCategory
                id={id}
              />
            </div>
            {renderChildCategories(categories, id)}
            <CreateCategory
              parent={id}
            />
          </li>
        ))
        }
      </ul>
      <CreateCategory/>
    </div>
  );
};

const Category = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string, // default: null
  isChild: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
});

CategoryManager.propTypes = {
  categories: PropTypes.objectOf(Category).isRequired,
  parentCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withCategoriesContainer(CategoryManager);
