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
  category: categoryPropType.type,
  renderCategory: PropTypes.func.isRequired,
};

Category.defaultProps = {
  category: categoryPropType.default,
};

export default withCategory(Category);
