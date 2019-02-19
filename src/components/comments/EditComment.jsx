import React from 'react';
import PropTypes from 'prop-types';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withEditingCommentContainer from '../../containers/EditingCommentContainer';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';

import { connectComponent } from '../../utils';
import * as Api from '../../api/comments';

import Editor from '../contents/CommentEditor';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    const { editingComment } = this.props;

    // editingComment가 없다 === 스토어에 댓글 정보를 등록중이다.
    this.state = {
      editingComment,
      isLoading: typeof editingComment === 'undefined',
      isDone: false,
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
    const {
      token, offEditMode, editingCommentDone, openAlert, addNotification,
    } = this.props;

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
        addNotification({
          message: '댓글이 수정되었습니다!!',
        });
      })
      .catch((err) => {
        openAlert(
          { message: err.response.data.message },
        );
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
    const { editingComment, isLoading } = this.state;

    return (
      <div>
        <Editor
          contents={isLoading ? 'Loading...' : editingComment.contents}
          onChange={this.onChange}/>
        <button type="button" onClick={this.onSubmit}>
          등록
        </button>
      </div>
    );
  }
}

EditComment.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addNotification: addNotificationPropType.type.isRequired,
  offEditMode: PropTypes.func.isRequired,
};

EditComment.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(EditComment,
  [
    withToken,
    withOpenAlert,
    withAddNotification,
    withEditingCommentContainer,
  ]);
