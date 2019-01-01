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
      const { categories } = this.props;
      return (
        <ComposedComponent categories={categories} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const { categories } = state.entities;
    const categoryNames = Object.keys(categories);

    if (!categoryNames.length) {
      return { categories: [] };
    }

    const parentCategoryNames = categoryNames.filter(name => !categories[name].isChild);

    const denormalizedCategories = parentCategoryNames.map((name) => {
      const denormalizedChildren = categories[name].children.map(childName => categories[childName]);
      const parentCategory = { ...categories[name], children: denormalizedChildren };
      return parentCategory;
    });

    return { categories: denormalizedCategories };
  };

  const mapDispatchToProps = { loadCategories };


  return connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
}
