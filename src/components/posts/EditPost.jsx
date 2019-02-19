import React from 'react';
import { Redirect } from 'react-router-dom';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withEditingPostContainer from '../../containers/EditingPostContainer';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { connectComponent } from '../../utils';

import * as Api from '../../api/posts';
import Editor from '../contents/PostEditor';
import UploadImage from './UploadImage';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    const { editingPost } = this.props;

    // editingPost가 없다 === 스토어에 댓글 정보를 등록중이다.
    this.state = {
      editingPost,
      uploadedImageLink: '',
      isLoading: typeof editingPost === 'undefined',
      isDone: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoading } = prevState;

    if (isLoading === false) {
      return null;
    }

    const { editingPost } = nextProps;
    if (editingPost) {
      return {
        ...prevState,
        editingPost,
        isLoading: false,
      };
    }

    return null;
  }

  componentWillUnmount() {
    const { isLoading, isDone, editingPost } = this.state;
    if (isLoading === false && isDone === false) {
      const { saveEditingPost } = this.props;
      saveEditingPost(editingPost);
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
    const { editingPost } = this.state;
    const {
      token, editingPostDone, openAlert, addNotification,
    } = this.props;

    Api.updatePost(editingPost, token)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          isDone: true,
        }));
        editingPostDone(editingPost._id);
        addNotification({
          message: '글이 수정되었습니다!!',
        });
      })
      .catch((err) => {
        openAlert(
          { message: err.response.data.message },
        );
      });
  }

  onTitleChange = (e) => {
    const { target } = e;
    const { value } = target;

    this.setState(prevState => (
      {
        ...prevState,
        editingPost: {
          ...prevState.editingPost,
          title: value,
        },
      }
    ));
  }

  onContentsChange = (value) => {
    this.setState(prevState => (
      {
        ...prevState,
        editingPost: {
          ...prevState.editingPost,
          contents: value,
        },
      }
    ));
  }


  render() {
    const {
      editingPost, isLoading, isDone, uploadedImageLink,
    } = this.state;

    if (isDone) {
      return (
        <Redirect to={{
          pathname: '/posts',
          search: `category=${editingPost.category}`,
        }}/>
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="title">
          제목
          <input type="text"
            name="title"
            value={isLoading ? 'Loading Title...' : editingPost.title}
            onChange={this.onTitleChange}/>
        </label>
        <UploadImage updateUploadedImageLink={this.updateUploadedImageLink}/>
        <Editor
          contents={isLoading ? 'Loading Contents...' : editingPost.contents}
          onChange={this.onContentsChange}
          preview
          autofocus
          insertText={uploadedImageLink}
          clearInsertText={this.clearUploadedImageLink}
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

EditPost.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addNotification: addNotificationPropType.type.isRequired,
};

EditPost.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(EditPost,
  [
    withAddNotification,
    withOpenAlert,
    withToken,
    withEditingPostContainer,
  ]);
