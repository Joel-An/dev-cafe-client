import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import withTokenContainer from '../../containers/TokenContainer';

import MdEditor from '../MdEditor';
import Editor from '../contents/Editor';

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
      <div>
        <Editor contents={contents} onChange={this.onChange}/>
        <button type="button" onClick={this.onSubmit}>
          등록
        </button>
      </div>
    );
  }
}

export default withTokenContainer(WriteComment);
