import React from 'react';
import dateFormat from 'dateformat';

import withCommentContainer from '../../containers/CommentContainer';
import withMyInfoContainer from '../../containers/MyInfoContainer';

import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import { Comment } from './Comment';
import ContentsViewer from '../contents/Viewer';

import User from '../users/User';

import './CommentListItem.scss';

const style = { border: '0.5px solid grey' };

const renderUser = user => user.profileName;

const renderComment = comment => (
  <>
    작성자 : <User userId={comment.author} renderUser={renderUser}/><br/>
    내용 : <ContentsViewer contents={comment.contents}/>
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

  onEdit = () => {
    this.setState(prevState => ({ ...prevState, isEditing: !prevState.isEditing }));
  }

  render() {
    const { addReply, isEditing } = this.state;
    const { comment, myInfo } = this.props;

    const isMyComment = (comment.author === myInfo._id);

    return (
      <li key={comment._id} style={style} className="CommentListItem">
        {isEditing
          ? <EditComment commentId={comment._id} offEditMode={this.onEdit}/>
          : <Comment comment={comment} renderComment={renderComment}/>
        }
        { isMyComment
          && <>
          <button type="button" onClick={this.onEdit}>
            {isEditing ? '취소' : '수정'}
          </button>
          <DeleteComment commentId={comment._id}/>
          </>
        }

        {comment.isChild || <button type="button" onClick={this.onAddReply}>
          답글
        </button>
        }
        <ChildCommentList childCommentIds={comment.childComments}/>
        {!addReply || <div className="addReply">
          <WriteComment
            postId={comment.post}
            parent={comment._id}
          />
        </div>
        }
      </li>
    );
  }
}

const CommentListItemWithMyInfo = withMyInfoContainer(CommentListItem);
const ConnectedCommentListItem = withCommentContainer(CommentListItemWithMyInfo);

export default ConnectedCommentListItem;
