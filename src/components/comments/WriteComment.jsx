import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import withTokenContainer from '../../containers/TokenContainer';

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

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ contents: value });
  }

  postComment=() => {
    const { token, postId, parent } = this.props;
    const { contents } = this.state;
    const config = { headers: { 'x-access-token': token } };
    const commentForm = {
      contents,
      postId,
      parent,
    };
    axios
      .post('/api/v1/comments', commentForm, config)
      .then((res) => {
        console.log(res.data);
        this.setState({ contents: '' });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    const { contents } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="comment">
          <input type="text"
            name="comment"
            value={contents}
            onChange={this.onChange}/>
        </label>
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default withTokenContainer(WriteComment);
