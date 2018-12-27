import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import WriteComment from './WriteComment';

class CommentArea extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    post: PropTypes.string,
  };

  static defaultProps = {
    token: null,
    post: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      error: true,
    };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    const { post } = this.props;
    axios.get(`/api/v1/comments?post=${post}`)
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            comments: result.data.comments,
            error: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ error: true, comments: null });
      });
  }

  render() {
    const { comments } = this.state;
    const { token, post } = this.props;
    return (
      <div>
        <CommentList
          comments={comments}
          token={token}
          post={post}
          getComments={this.getComments}
        />
        <WriteComment
          token={token}
          post={post}
          getComments={this.getComments}
        />
      </div>
    );
  }
}

export default CommentArea;
