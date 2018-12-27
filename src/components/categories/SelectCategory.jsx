import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    axios
      .get('/api/v1/categories')
      .then((result) => {
        const { categories } = result.data;
        const { onSelect } = this.props;
        onSelect(categories[0]._id);
        this.setState({ categories });
      })
      .catch(err => console.error(err.message));
  }

  onChange = (e) => {
    const { onSelect } = this.props;
    onSelect(e.target.value);
  }

  render() {
    const { categories } = this.state;
    const { selectedCategory } = this.props;

    return (
      <select value={selectedCategory} onChange={this.onChange}>
        {categories
            && categories.map(category => (
              <>
                <Category
                  category={category}
                />
                <ChildCategories
                  childCategories={category.children}
                />
              </>
            ))
        }
      </select>
    );
  }
}

const Category = ({ category, prefix }) => (
  <option value={category._id}>
    {prefix}{category.name}
  </option>
);

Category.propTypes = {
  category: PropTypes.shape({ _id: 'id', name: 'name' }).isRequired,
  prefix: PropTypes.string,
};

Category.defaultProps = {
  prefix: '',
};

const ChildCategories = ({ childCategories }) => {
  if (childCategories.length === 0) {
    return null;
  }

  const children = childCategories.map(child => (
    <Category
      category={child}
      prefix="ㄴ"
    />
  ));

  return children;
};

ChildCategories.propTypes = {
  childCategories: PropTypes.shape([{ _id: 'id', name: 'name' }]).isRequired,
};

export default SelectCategory;
