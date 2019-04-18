import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import { connectComponent } from '../../utils';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import ContentsViewer from '../contents/Viewer';

import User from '../users/User';

import './CommentListItem.scss';

const getProfileName = user => (<Link to={`/users/${user._id}`}>{user.profileName}</Link>);
const getProfilePic = user => (
  <Link to={`/users/${user._id}`}>
    <img alt={`@${user.profileName}`} height="44" width="44" src={user.profilePic}/>
  </Link>
);

const ProfileName = ({ userId }) => <User userId={userId} renderUser={getProfileName}/>;
const ProfilePic = ({ userId }) => <User userId={userId} renderUser={getProfilePic}/>;

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
    const { isFetchingNewChildComment } = comment;

    return (
      <li key={comment._id} className="CommentListItem">
        <article className="comment">
          <div className="comment-header">
            <ProfilePic userId={comment.author}/>
            <span className="comment-meta">
              <ProfileName userId={comment.author}/>
              <p className="date">
                {dateFormat(comment.date, 'yy/mm/dd h:MM TT')}
              </p>
            </span>
            <div className="comment-control-group">
              { isMyComment
            && <>
              <button type="button" onClick={this.onEdit}>
                {isEditing ? '취소' : '수정'}
              </button>
              <DeleteComment commentId={comment._id}/>
              </>
              }
              {comment.isChild || <button type="button" onClick={this.onAddReply}>답글</button>}
            </div>
          </div>
          {isEditing
            ? <EditComment commentId={comment._id} offEditMode={this.onEdit}/>
            : <ContentsViewer className="comment-body markdown" contents={comment.contents}/>
          }
        </article>

        <ChildCommentList childCommentIds={comment.childComments}/>
        {isFetchingNewChildComment && <LoadingSpinner center/> }
        {!addReply || <div className="addReply">
          <WriteComment
            postId={comment.post}
            parent={comment._id}
            autofocus
          />
        </div>
        }
      </li>
    );
  }
}

CommentListItem.propTypes = {
  myInfo: myInfoPropType.type,
  comment: commentPropInfo.type.isRequired,
};

CommentListItem.defaultProps = {
  myInfo: myInfoPropType.default,
};

export default connectComponent(CommentListItem,
  [
    withMyInfo,
    withComment,
  ]);
