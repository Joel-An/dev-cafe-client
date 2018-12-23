import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class ManageCategories extends React.Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.state = {
      categoryName: '',
      categories: null,
      token,
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
    const { token } = this.state;
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
      <div >
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
      </div>
    );
  }
}

ManageCategories.propTypes = {
  token: PropTypes.string,
};

ManageCategories.defaultProps = {
  token: '',
};

export default ManageCategories;
