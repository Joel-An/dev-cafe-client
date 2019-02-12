import React from 'react';
import { Redirect } from 'react-router-dom';

import withTokenContainer from '../../containers/TokenContainer';
import withAlertContainer from '../../containers/AlertContainer';
import withEditingPostContainer from '../../containers/EditingPostContainer';
import * as Api from '../../api/posts';
import Editor from '../contents/PostEditor';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    const { editingPost } = this.props;

    // editingPost가 없다 === 스토어에 댓글 정보를 등록중이다.
    this.state = {
      editingPost,
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

  onSubmit = (e) => {
    e.preventDefault();
    const { editingPost } = this.state;
    const { token, editingPostDone, openAlert } = this.props;

    Api.updatePost(editingPost, token)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          isDone: true,
        }));
        editingPostDone(editingPost._id);
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
      editingPost, isLoading, isDone,
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
        <Editor
          contents={isLoading ? 'Loading Contents...' : editingPost.contents}
          onChange={this.onContentsChange}
          preview
          autofocus
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

const EditPostWithToken = withTokenContainer(EditPost);
const EditPostWithAlert = withAlertContainer(EditPostWithToken);
export default withEditingPostContainer(EditPostWithAlert);
