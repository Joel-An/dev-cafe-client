import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectLastVisitedCategoryId } from '../store/selectors/categories';

const mapStateToProps = (state) => {
  const lastVisitedCategoryId = selectLastVisitedCategoryId(state);

  return { lastVisitedCategoryId };
};

export default function withLastVisitedCategoryId(Component) {
  return connect(mapStateToProps)(Component);
}

export const lastVisitedCategoryIdPropType = {
  type: PropTypes.string,
  default: 'all',
};
