import React from 'react';

import withTokenContainer from '../../containers/TokenContainer';
import withEditingCommentContainer from '../../containers/EditingCommentContainer';
import * as Api from '../../api/comments';

import Editor from '../contents/Editor';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    const { editingComment } = this.props;

    // editingComment가 없다 === 스토어에 댓글 정보를 등록중이다.
    this.state = {
      editingComment,
      isLoading: typeof editingComment === 'undefined',
      isDone: false,
      error: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoading } = prevState;

    if (isLoading === false) {
      return null;
    }

    const { editingComment } = nextProps;
    if (editingComment) {
      return {
        ...prevState,
        editingComment,
        isLoading: false,
      };
    }

    return null;
  }

  componentWillUnmount() {
    const { isLoading, isDone, editingComment } = this.state;
    if (isLoading === false && isDone === false) {
      const { saveEditingComment } = this.props;
      saveEditingComment(editingComment);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { editingComment } = this.state;
    const { token, offEditMode, editingCommentDone } = this.props;

    const editedComment = {
      _id: editingComment._id,
      contents: editingComment.contents,
    };
    Api.updateComment(editedComment, token)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          isDone: true,
        }));
        editingCommentDone(editedComment._id);
        offEditMode();
      })
      .catch((err) => {
        this.setState(prevState => ({
          ...prevState,
          error: err.response.data.message,
        }));
      });
  }

  onChange = (value) => {
    this.setState(prevState => ({
      ...prevState,
      editingComment: {
        ...prevState.editingComment,
        contents: value,
      },
    }));
  }

  render() {
    const { editingComment, isLoading, error } = this.state;

    return (
      <div>
        <Editor
          contents={isLoading ? 'Loading...' : editingComment.contents}
          onChange={this.onChange}/>
        {error || <p>{error}</p>}
        <button type="button" onClick={this.onSubmit}>
          등록
        </button>
      </div>
    );
  }
}

const EditCommentWithToken = withTokenContainer(EditComment);
export default withEditingCommentContainer(EditCommentWithToken);
