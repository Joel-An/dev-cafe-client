import React from 'react';
import withCategoryContainer from '../../containers/CategoryContainer';

const Category = (props) => {
  const { category, renderCategory } = props;

  return renderCategory(category);
};

export default withCategoryContainer(Category);
