import { connect } from 'react-redux';
import React from 'react';

import { fetchCategories } from '../store/actions/categories';
import CategoryList from '../components/categories/CategoryList';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
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

const mapDispatchToProps = { fetchCategories };


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryContainer);
