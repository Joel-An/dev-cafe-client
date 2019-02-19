import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { categoryPropType, categoryIdPropType } from './WithCategory';

import { loadCategories as loadCategoriesAction } from '../store/actions/categories';
import { getCategories, getParentCategoryIds } from '../store/selectors/categories';


export const CategoriesContainerPropTypes = {
  categories: PropTypes.objectOf(categoryPropType.type),
  parentCategoryIds: PropTypes.arrayOf(categoryIdPropType),
  loadCategories: PropTypes.func.isRequired,
};

export const CategoriesContainerDefaultProps = {
  categories: {},
  parentCategoryIds: [],
};

export default function withCategoriesContainer(ComposedComponent) {
  class CategoriesContainer extends React.Component {
    static propTypes = CategoriesContainerPropTypes;

    static defaultProps = CategoriesContainerDefaultProps;

    componentDidMount() {
      const { loadCategories } = this.props;
      loadCategories();
    }

    render() {
      const newProps = { ...this.props };
      delete newProps.loadCategories;
      return (
        <ComposedComponent {...newProps} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const categories = getCategories(state);
    const parentCategoryIds = getParentCategoryIds(state);

    return { categories, parentCategoryIds };
  };
  const mapDispatchToProps = { loadCategories: loadCategoriesAction };

  return connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
}
