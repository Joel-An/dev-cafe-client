import React from 'react';

import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';

const style = { border: '0.5px solid grey' };

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addReply: false,
    };
  }

  onAddReply = (e) => {
    e.preventDefault();
    this.setState({ addReply: !this.state.addReply });
  }

  render() {
    const {
      comment, token, post, getComments,
    } = this.props;
    const { addReply } = this.state;
    return (
      <li key={comment._id} style={style}>
    내용 : {comment.contents}<br/>
    작성자 : {comment.author.profileName}<br/>
        <button type="button">
          수정
        </button>
        <button type="button">
          삭제
        </button>
        {comment.isChild || <button type="button" onClick={this.onAddReply}>
          답글
        </button>
        }

        <ChildCommentList childComments={comment.children}/>
        {comment.isChild || !addReply || <WriteComment
          token={token}
          post={post}
          parent={comment._id}
          getComments={getComments}
        />}
      </li>

    );
  }
}


export default Comment;
