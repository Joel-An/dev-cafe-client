import React from 'react';
import { Redirect } from 'react-router-dom';

import withTokenContainer from '../../containers/TokenContainer';
import withEditingPostContainer from '../../containers/EditingPostContainer';
import * as Api from '../../api/posts';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    const { editingPost } = this.props;

    // editingPost가 없다 === 스토어에 댓글 정보를 등록중이다.
    this.state = {
      editingPost,
      isLoading: typeof editingPost === 'undefined',
      isDone: false,
      error: false,
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
    const { token, editingPostDone } = this.props;

    Api.updatePost(editingPost, token)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          isDone: true,
        }));
        editingPostDone(editingPost._id);
      })
      .catch((err) => {
        this.setState(prevState => ({
          ...prevState,
          error: err.response.data.message,
        }));
      });
  }

  onChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState(prevState => ({
      ...prevState,
      editingPost: {
        ...prevState.editingPost,
        [name]: value,
      },
    }));
  }

  render() {
    const {
      editingPost, isLoading, error, isDone,
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
            onChange={this.onChange}/>
        </label>
        <label htmlFor="contents">
          내용
          <input type="text"
            name="contents"
            value={isLoading ? 'Loading Contents...' : editingPost.contents}
            onChange={this.onChange}/>
        </label>
        {error || <p>{error}</p>}
        <button type="submit">등록</button>
      </form>
    );
  }
}

const EditPostWithToken = withTokenContainer(EditPost);
export default withEditingPostContainer(EditPostWithToken);
