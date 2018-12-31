import { connect } from 'react-redux';
import React from 'react';

import { loadCategories } from '../store/actions/categories';
import CategoryList from '../components/categories/CategoryList';

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
      <CategoryList categories={categories}/>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = { loadCategories };


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);
