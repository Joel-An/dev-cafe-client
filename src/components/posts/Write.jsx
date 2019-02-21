import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect, Link } from 'react-router-dom';

import CategorySelector from '../categories/SelectCategory';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent } from '../../utils';

import { postPost } from '../../api/posts';
import Editor from '../contents/PostEditor';
import UploadImage from './UploadImage';
import LoginButton from '../layout/LoginButton';

import './Write.scss';

class Write extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const { categoryId } = match.params;
    const initialId = categoryId === 'all' ? '' : categoryId;

    this.state = {
      postForm: {
        title: '',
        contents: '',
        categoryId: initialId,
      },
      uploadedImageLink: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { token, openAlert } = this.props;

    if (!token) {
      openAlert({
        message: '로그인해야 글 등록이 가능합니다!',
        loginButton: true,
      });
    }
  }

  updateUploadedImageLink = (link) => {
    this.setState(prevState => ({
      ...prevState,
      uploadedImageLink: link,
    }));
  }

  clearUploadedImageLink = () => {
    this.setState(prevState => ({
      ...prevState,
      uploadedImageLink: '',
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { postForm } = this.state;
    const {
      token, openAlert, addNotification,
    } = this.props;
    postPost(postForm, token)
      .then(() => {
        addNotification({
          message: '글이 등록되었습니다!',
        });
        this.setState({ redirect: true });
      })
      .catch((err) => {
        openAlert({
          message: err.response.data.message,
        });
      });
  }

  onTitleChange = (e) => {
    const { target } = e;
    const { value } = target;

    this.setState(prevState => (
      {
        ...prevState,
        postForm: {
          ...prevState.postForm,
          title: value,
        },
      }
    ));
  }

  onContentsChange = (value) => {
    this.setState(prevState => (
      {
        ...prevState,
        postForm: {
          ...prevState.postForm,
          contents: value,
        },
      }
    ));
  }

  onSelectCategory = (categoryId) => {
    this.setState(prevState => (
      {
        ...prevState,
        postForm: {
          ...prevState.postForm,
          categoryId,
        },
      }
    ));
  }

  render() {
    const { postForm, redirect, uploadedImageLink } = this.state;
    const { token, lastVisitedCategoryId } = this.props;

    if (redirect) {
      return <Redirect to={{
        pathname: '/posts',
        search: `category=${postForm.categoryId}`,
      }}/>;
    }

    return (
      <div className="WritePost">
        <form className="post-form" onSubmit={this.onSubmit}>
          <div className="header">
            <div className="post-form-header-menu">
              <div className="post-form-header-menu-front">
                <Link to={`/posts?category=${lastVisitedCategoryId}`}>
                  <button type="button">
                    뒤로가기
                  </button>
                </Link>
              </div>
              <div className="post-form-header-menu-back">
                {!!token || <LoginButton/> }
                <UploadImage updateUploadedImageLink={this.updateUploadedImageLink}/>
                <button type="submit">작성</button>
              </div>
            </div>
            <div className="post-form-header-input">
              <CategorySelector
                onSelect={this.onSelectCategory}
                selectedCategory={postForm.categoryId}
              />
              <input type="text"
                name="title"
                value={postForm.title}
                placeholder="Title"
                onChange={this.onTitleChange}/>
            </div>
          </div>
          <Editor
            contents={postForm.contents}
            onChange={this.onContentsChange}
            preview
            insertText={uploadedImageLink}
            clearInsertText={this.clearUploadedImageLink}
          />
        </form>
      </div>
    );
  }
}

Write.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addNotification: addNotificationPropType.type.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
};

Write.defaultProps = {
  token: tokenPropType.default,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
};

export default connectComponent(Write,
  [
    withOpenAlert,
    withAddNotification,
    withToken,
    withLastVisitedCategoryId,
  ]);
