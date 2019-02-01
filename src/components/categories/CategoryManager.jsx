import React from 'react';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';
import DeleteCategory from './DeleteCategory';
import withCategoriesContainer from '../../containers/CategoriesContainer';

const renderChildCategories = (categories, id) => {
  if (categories[id].children.length === 0) {
    return null;
  }

  return (
    <ul className="subCategoryList">
      {categories[id].children.map(childId => (
        <li name={categories[childId].name} key={childId}>
          ㄴ{categories[childId].name}
          <DeleteCategory
            id={childId}
          />
        </li>
      ))
      }
    </ul>
  );
};

const CategoryManager = (props) => {
  const { categories, parentCategoryIds } = props;
  const style = { border: '0.5px solid #dddddd' };

  const isEmpty = !parentCategoryIds.length;

  if (isEmpty) {
    return null;
  }

  return (
    <>
      <ul className="categoryList" style={style}>
        {parentCategoryIds.map(id => (
          <li name={categories[id].name} style={style} key={id}>
            {categories[id].name}
            <DeleteCategory
              id={id}
            />
            {renderChildCategories(categories, id)}
            <CreateCategory
              parent={id}
            />
          </li>
        ))
        }
      </ul>
      <CreateCategory/>
    </>
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
  parentCategoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default withCategoriesContainer(CategoryManager);
