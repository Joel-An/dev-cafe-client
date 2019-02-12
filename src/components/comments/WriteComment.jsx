import React from 'react';
import PropTypes from 'prop-types';

import withTokenContainer from '../../containers/TokenContainer';
import withAlertContainer from '../../containers/AlertContainer';
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
      token, postId, parent, openAlert,
    } = this.props;
    const { contents } = this.state;
    const commentForm = {
      contents,
      postId,
      parent,
    };
    Api.postComment(commentForm, token)
      .then(() => {
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

const WriteCommentWithAlert = withAlertContainer(WriteComment);

export default withTokenContainer(WriteCommentWithAlert);
