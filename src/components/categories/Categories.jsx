import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';
import DeleteCategory from './DeleteCategory';


class Categories extends React.Component {
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
    const style = { border: '0.5px solid #dddddd' };
    return (
      <ul style={style}>
        {categories
            && categories.map(category => (
              <li style={style} id={category._id}>
                {category.name}
                <DeleteCategory
                  id={category._id}
                  token={token}
                />
                <ChildCategories
                  childCategories={category.children}
                  token={token}
                />
                <CreateCategory
                  token={token}
                  parent={category._id}
                />
              </li>
            ))
        }
      </ul>
    );
  }
}

const ChildCategories = ({ childCategories, token }) => {
  if (childCategories.length === 0) {
    return null;
  }

  return (
    <ul>
      {childCategories.map(child => (
        <li id={child._id}>
          ㄴ{child.name}
          <DeleteCategory
            id={child._id}
            token={token}
          />
        </li>
      ))
      }
    </ul>
  );
};
ChildCategories.propTypes = {
  childCategories: PropTypes.shape([{ _id: 'id', name: 'name' }]).isRequired,
  token: PropTypes.string.isRequired,
};

Categories.propTypes = {
  token: PropTypes.string,
};

Categories.defaultProps = {
  token: null,
};

export default Categories;
