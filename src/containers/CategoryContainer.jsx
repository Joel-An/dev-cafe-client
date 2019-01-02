import { connect } from 'react-redux';
import React from 'react';

import { loadCategories } from '../store/actions/categories';

export default function withCategoryContainer(ComposedComponent) {
  class CategoryContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    componentDidMount() {
      this.props.loadCategories();
    }


    render() {
      const { categories, parentCategoryNames } = this.props;
      return (
        <ComposedComponent categories={categories} parentCategoryNames={parentCategoryNames} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const { categories } = state.entities;
    const categoryNames = Object.keys(categories);

    if (!categoryNames.length) {
      return { categories: {}, parentCategoryNames: [] };
    }

    const parentCategoryNames = categoryNames.filter(name => !categories[name].isChild);

    return { categories, parentCategoryNames };
  };
  const mapDispatchToProps = { loadCategories };


  return connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
}
