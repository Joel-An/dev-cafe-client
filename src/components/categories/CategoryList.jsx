import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class CategoryList extends React.Component {
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
        this.setState({ categories });
      })
      .catch(err => console.error(err.message));
  }

  render() {
    const { token } = this.props;
    const { categories } = this.state;
    const style = { border: '0.5px solid #eeeeee' };
    return (
      <ul style={style}>
        <li key="categoryAll">
          <Link to="/posts">전체 보기</Link>
        </li>
        {categories
            && categories.map(category => (
              <li style={style} key={category._id}>
                <Link to={{
                  pathname: '/posts',
                  search: `category=${category._id}`,
                }}>{category.name}</Link>
                <ChildCategories
                  childCategories={category.children}
                  token={token}
                />

              </li>
            ))
        }
      </ul>
    );
  }
}

const ChildCategories = ({ childCategories }) => {
  if (childCategories.length === 0) {
    return null;
  }

  return (
    <ul>
      {childCategories.map(child => (
        <li key={child._id}>
          <Link to={{
            pathname: '/posts',
            search: `category=${child._id}`,
          }}>ㄴ{child.name}</Link>
        </li>
      ))
      }
    </ul>
  );
};
ChildCategories.propTypes = {
  childCategories: PropTypes.shape([{ _id: 'id', name: 'name' }]).isRequired,
};

CategoryList.propTypes = {
  token: PropTypes.string,
};

CategoryList.defaultProps = {
  token: null,
};

export default CategoryList;
