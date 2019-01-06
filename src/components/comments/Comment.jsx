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
    this.setState(prevState => ({ addReply: !prevState.addReply }));
  }

  render() {
    const {
      comments, commentId, users, token,
    } = this.props;
    const { addReply } = this.state;
    const comment = comments[commentId];
    return (
      <li key={comment._id} style={style}>
    내용 : {comment.contents}<br/>
    작성자 : {users[comment.author].profileName}<br/>
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

        <ChildCommentList childCommentIds={comment.children} users={users} comments={comments}/>
        {comment.isChild || !addReply || <WriteComment
          postId={comment.post}
          parent={comment._id}
        />}
      </li>

    );
  }
}


export default Comment;
