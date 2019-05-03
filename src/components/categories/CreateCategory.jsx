import React from 'react';
import PropTypes from 'prop-types';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddToastNotification, { addToastNotificationPropInfo } from '../toastNotifications/WithAddToastNotification';

import { connectComponent } from '../../utils';

import * as api from '../../api/categories';

import './CreateCategory.scss';

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

    this.setState(prevState => ({ ...prevState, categoryName: '' }));
    this.postCategories(categoryName);
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({ ...prevState, categoryName: value }));
  }

  postCategories = (name) => {
    const {
      parent, token, openAlert, addToastNotification,
    } = this.props;
    const category = { name, parent };

    api.postCategory(category, token)
      .then(() => {
        this.setState({ categoryName: '' });
        addToastNotification({
          message: '카테고리가 생성되었습니다!',
        });
      }).catch((err) => {
        openAlert(
          { message: err.response.data.message },
        );
      });
  }

  render() {
    const { categoryName } = this.state;
    const { parent } = this.props;

    const placeholder = parent ? '하위 카테고리' : '상위 카테고리';

    return (
      <form onSubmit={this.onSubmit} className="CreateCategory">
        <label htmlFor="categoryName">
          <input type="text"
            name="categoryName"
            value={categoryName}
            placeholder={placeholder}
            onChange={this.onChange}/>
        </label>
        <button type="submit">추가</button>
      </form>
    );
  }
}

CreateCategory.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addToastNotification: addToastNotificationPropInfo.type.isRequired,
  parent: PropTypes.string,
};

CreateCategory.defaultProps = {
  token: tokenPropType.default,
  parent: null,
};

export default connectComponent(CreateCategory,
  [
    withOpenAlert,
    withAddToastNotification,
    withToken,
  ]);
