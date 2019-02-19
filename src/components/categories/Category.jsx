import React from 'react';
import PropTypes from 'prop-types';
import withCategory, { categoryPropType } from '../../containers/WithCategory';

const Category = (props) => {
  const { category, renderCategory } = props;

  if (!category) {
    return <p>Loading Category...</p>;
  }

  return renderCategory(category);
};

Category.propTypes = {
  category: categoryPropType.type.isRequired,
  renderCategory: PropTypes.func.isRequired,
};

export default withCategory(Category);
