import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { categoryName } = this.state;
    const { parent } = this.props;
    this.postCategories(categoryName, parent);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ categoryName: value });
  }

  postCategories = (name, parent) => {
    const category = { name, parent };
    const { token } = this.props;
    const config = { headers: { 'x-access-token': token } };
    axios
      .post('/api/v1/categories', category, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    const { categoryName } = this.state;
    const { parent } = this.props;
    const placeholder = parent ? '하위 카테고리' : '상위 카테고리';

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="categoryName">
            <input type="text"
              name="categoryName"
              value={categoryName}
              placeholder={placeholder}
              onChange={this.onChange}/>
          </label>
          <button type="submit">추가</button>
        </div>
      </form>
    );
  }
}

CreateCategory.propTypes = {
  token: PropTypes.string.isRequired,
  parent: PropTypes.string,
};

CreateCategory.defaultProps = {
  parent: null,
};

export default CreateCategory;
