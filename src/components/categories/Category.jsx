import React from 'react';
import withCategoryContainer from '../../containers/CategoryContainer';

const Category = (props) => {
  const { category, renderCategory } = props;

  if (!category) {
    return <p>Loading Category...</p>;
  }

  return renderCategory(category);
};

export default withCategoryContainer(Category);
