import React from 'react';
import PropTypes from 'prop-types';

import withTokenContainer from '../../containers/TokenContainer';
import withAlertContainer from '../../containers/AlertContainer';
import withAddNotification from '../notifications/WithAddNotification';

import { connectComponent } from '../../utils';

import * as Api from '../../api/comments';
import Editor from '../contents/CommentEditor';

import './WriteComment.scss';

class WriteComment extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    postId: PropTypes.string,
    parent: PropTypes.string,
  };

  static defaultProps = {
    token: null,
    postId: null,
    parent: null,
  };

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
      token, postId, parent, openAlert, addNotification,
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
        addNotification({
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

export default connectComponent(WriteComment,
  [
    withTokenContainer,
    withAlertContainer,
    withAddNotification,
  ]);
