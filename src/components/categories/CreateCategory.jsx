import React from 'react';
import PropTypes from 'prop-types';

import withTokenContainer from '../../containers/TokenContainer';
import { fetchCategories } from '../../store/actions/categories';
import * as api from '../../api/categories';

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      error: null,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { categoryName } = this.state;

    this.setState(prevState => ({ ...prevState, categoryName: '' }));
    this.postCategories(categoryName);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({ ...prevState, categoryName: value }));
  }

  postCategories = (name) => {
    const { parent, token, dispatch } = this.props;
    const category = { name, parent };

    api.postCategory(category, token)
      .then(() => {
        this.setState(prevState => ({ ...prevState, error: null }));
        dispatch(fetchCategories());
      }).catch((err) => {
        this.setState(prevState => ({ ...prevState, error: err.response.data }));
      });
  }

  render() {
    const { categoryName, error } = this.state;
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
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

CreateCategory.propTypes = {
  token: PropTypes.string.isRequired,
  parent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

CreateCategory.defaultProps = {
  parent: null,
};

export default withTokenContainer(CreateCategory);
