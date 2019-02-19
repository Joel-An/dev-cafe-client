import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategoryById } from '../store/selectors/categories';

const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps;
  const category = getCategoryById(state, categoryId);

  return { category };
};

export default function withCategory(Component) {
  return connect(mapStateToProps)(Component);
}

export const categoryIdPropType = PropTypes.string;

export const categoryPropType = {
  type: PropTypes.shape({
    _id: categoryIdPropType.isRequired,
    parent: categoryIdPropType,
    isChild: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(categoryIdPropType),
  }),
  default: undefined,
};
