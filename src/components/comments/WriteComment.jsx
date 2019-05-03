import React from 'react';
import PropTypes from 'prop-types';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withToastAddNotification, { addToastNotificationPropInfo } from '../toastNotifications/WithAddToastNotification';

import { connectComponent } from '../../utils';

import * as Api from '../../api/comments';
import Editor from '../contents/CommentEditor';

import './WriteComment.scss';

class WriteComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.postComment();
  }

  onChange = (value) => {
    this.setState({ contents: value });
  }

  postComment=() => {
    const {
      token, postId, parent, openAlert, addToastNotification,
    } = this.props;

    if (!token) {
      openAlert({
        message: '로그인 후 이용할 수 있습니다!',
        loginButton: true,
      });

      return;
    }

    const { contents } = this.state;
    const commentForm = {
      contents,
      postId,
      parent,
    };
    Api.postComment(commentForm, token)
      .then(() => {
        addToastNotification({
          message: '댓글이 등록되었습니다!!',
        });
        this.setState({ contents: '' });
      })
      .catch((err) => {
        openAlert(
          { message: err.response.data.message },
        );
      });
  }

  render() {
    const { contents } = this.state;
    const { autofocus } = this.props;

    return (
      <div className="WriteComment">
        <Editor
          contents={contents}
          onChange={this.onChange}
          autofocus={autofocus}
        />
        <div className="write-comment-button-group">
          <button type="button" onClick={this.onSubmit}>
            등록
          </button>
        </div>
      </div>
    );
  }
}

WriteComment.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addToastNotification: addToastNotificationPropInfo.type.isRequired,
  postId: PropTypes.string,
  parent: PropTypes.string,
  autofocus: PropTypes.bool.isRequired,
};

WriteComment.defaultProps = {
  token: tokenPropType.default,
  postId: null,
  parent: null,
};


export default connectComponent(WriteComment,
  [
    withToken,
    withOpenAlert,
    withToastAddNotification,
  ]);
