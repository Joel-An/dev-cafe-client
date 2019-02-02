import React from 'react';
import dateFormat from 'dateformat';

import withCommentContainer from '../../containers/CommentContainer';

import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';
import { Comment } from './Comment';

import User from '../users/User';

const style = { border: '0.5px solid grey' };

const EditComment = () => (<p>Editing...</p>);

const renderUser = user => user.profileName;

const renderComment = comment => (
  <>
    작성자 : <User userId={comment.author} renderUser={renderUser}/><br/>
    내용 : {comment.contents}<br/>
    작성 시간 : {dateFormat(comment.date, 'yy/mm/dd h:MM TT')}<br/>
  </>
);


class CommentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      addReply: false,
    };
  }

  onAddReply = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, addReply: !prevState.addReply }));
  }

  onEdit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, isEditing: !prevState.isEditing }));
  }

  render() {
    const { addReply, isEditing } = this.state;
    const { comment } = this.props;
    return (
      <li key={comment._id} style={style}>
        {isEditing
          ? <EditComment/>
          : <Comment comment={comment} renderComment={renderComment}/>
        }
        <button type="button" onClick={this.onEdit}>
          수정
        </button>
        <button type="button">
          삭제
        </button>
        {comment.isChild || <button type="button" onClick={this.onAddReply}>
          답글
        </button>
        }
        <ChildCommentList childCommentIds={comment.childComments}/>
        {!addReply || <WriteComment
          postId={comment.post}
          parent={comment._id}
        />}
      </li>
    );
  }
}

const Connected = withCommentContainer(CommentListItem);

export default Connected;
