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
    this.postCategories(categoryName);
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
    return (
      <form onSubmit={this.onSubmit}>
        <legend>카테고리 생성</legend>
        <div>
          <label htmlFor="categoryName">
              이름
            <input type="text"
              name="categoryName"
              value={categoryName}
              onChange={this.onChange}/>
          </label>
        </div>
        <div>
          <button type="submit">생성</button>
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
