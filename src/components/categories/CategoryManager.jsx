import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';

import CreateCategory from './CreateCategory';
import DeleteCategory from './DeleteCategory';

import withCategoriesContainer, { CategoriesContainerPropTypes, CategoriesContainerDefaultProps } from '../../containers/CategoriesContainer';

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
    <Fragment>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
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
    </Fragment>
  );
};

CategoryManager.propTypes = {
  categories: CategoriesContainerPropTypes.categories,
  parentCategoryIds: CategoriesContainerPropTypes.parentCategoryIds,
};

CategoryManager.defaultProps = {
  categories: CategoriesContainerDefaultProps.categories,
  parentCategoryIds: CategoriesContainerDefaultProps.parentCategoryIds,
};

export default withCategoriesContainer(CategoryManager);
