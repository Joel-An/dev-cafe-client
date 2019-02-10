import { connect } from 'react-redux';
import React from 'react';

import { selectLastVisitedCategoryId } from '../store/selectors/categories';

export default function withLastVisitedCategoryIdContainer(ComposedComponent) {
  const LastVisitedCategoryContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state) => {
    const lastVisitedCategoryId = selectLastVisitedCategoryId(state);

    return { lastVisitedCategoryId };
  };

  return connect(mapStateToProps)(LastVisitedCategoryContainer);
}
