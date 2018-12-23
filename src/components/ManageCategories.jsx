import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';


class ManageCategories extends React.Component {
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
      <div >
        <ul style={style}>
          {categories
            && categories.map(category => (
              <li style={style} id={category._id}>{category.name}</li>
            ))
          }
        </ul>
        <CreateCategory token={token} />
      </div>
    );
  }
}

ManageCategories.propTypes = {
  token: PropTypes.string.isRequired,
};


export default ManageCategories;
