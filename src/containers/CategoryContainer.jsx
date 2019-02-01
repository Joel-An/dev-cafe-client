import { connect } from 'react-redux';
import React from 'react';

import { getCategoryById } from '../store/selectors/categories';

export default function withCategoryContainer(ComposedComponent) {
  const CategoryContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state, ownProps) => {
    const { categoryId } = ownProps;
    const category = getCategoryById(state, categoryId);

    return { category };
  };

  return connect(mapStateToProps)(CategoryContainer);
}
