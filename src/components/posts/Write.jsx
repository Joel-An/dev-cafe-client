import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';

import CategorySelector from '../categories/SelectCategory';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { connectComponent } from '../../utils';

import { postPost } from '../../api/posts';
import Editor from '../contents/PostEditor';
import UploadImage from './UploadImage';

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

    if (redirect) {
      return <Redirect to={{
        pathname: '/posts',
        search: `category=${postForm.categoryId}`,
      }}/>;
    }

    return (
      <div className="WritePost">
        <form onSubmit={this.onSubmit}>
          <div>
            <CategorySelector
              onSelect={this.onSelectCategory}
              selectedCategory={postForm.categoryId}
            />
          </div>
          <div>
            <label htmlFor="title">
              <input type="text"
                name="title"
                value={postForm.title}
                placeholder="Title"
                onChange={this.onTitleChange}/>
            </label>
            <UploadImage updateUploadedImageLink={this.updateUploadedImageLink}/>
          </div>
          <div>
            <Editor
              contents={postForm.contents}
              onChange={this.onContentsChange}
              preview
              insertText={uploadedImageLink}
              clearInsertText={this.clearUploadedImageLink}
            />
          </div>
          <button type="submit">작성</button>
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
};

Write.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(Write,
  [
    withOpenAlert,
    withAddNotification,
    withToken,
  ]);
