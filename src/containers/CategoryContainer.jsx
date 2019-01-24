import { connect } from 'react-redux';
import React from 'react';

import { loadCategories as loadCategoriesAction } from '../store/actions/categories';
import { getCategories, getParentCategoryIds } from '../store/selectors/categories';

export default function withCategoryContainer(ComposedComponent) {
  class CategoryContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

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

  return connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
}
