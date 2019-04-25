import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import { connectComponent, isAuthor } from '../../utils';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import ChildCommentList from './ChildCommentList';
import WriteComment from './WriteComment';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import ContentsViewer from '../contents/Viewer';
import GiveHeartButton from './GiveHeartButton';
import AuthorHeart from './AuthorHeart';
import CommentLikesButton from './CommentLikesButton';
import CommentDislikesButton from './CommentDislikesButton';
import Hoverable from '../common/Hoverable';

import UserList from '../users/UserList';
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

    const isMyComment = isAuthor(myInfo, comment);
    const { isFetchingNewChildComment } = comment;

    return (
      <li key={comment._id} className="CommentListItem">
        <article className="comment">
          <div className="comment-header">
            <ProfilePic userId={comment.author}/>
            <span className="comment-meta">
              <ProfileName userId={comment.author}/>
              <div className="date">
                {comment.isThisModified
                  ? <>
                      <p className="last-modified-date hide-on-hover">{dateFormat(comment.modifiedDate, 'yy/mm/dd h:MM TT (수정됨)')}</p>
                      <p className="pub-date reveal-on-hover">{dateFormat(comment.date, 'yy/mm/dd h:MM TT (작성)')}</p>
                    </>
                  : <p className="pub-date">{dateFormat(comment.date, 'yy/mm/dd h:MM TT')}</p>
                }
              </div>
            </span>

            <div className="comment-control-group">
              { isMyComment
            && <>
              <button type="button" onClick={this.onEdit}>
                <FontAwesomeIcon icon="edit" />
              </button>
              <DeleteComment commentId={comment._id}/>
              </>
              }
              <GiveHeartButton commentId={comment._id}/>
            </div>
          </div>
          {isEditing
            ? <EditComment commentId={comment._id} offEditMode={this.onEdit}/>
            : <ContentsViewer className="comment-body markdown" contents={comment.contents}/>
          }
          <div className="comment-action-buttons">
            <Hoverable hoverComponent={<UserList title="좋아요!" userIds={comment.likes}/>}>
              <CommentLikesButton commentId={comment._id}/>
            </Hoverable>
            <span className="likes-count">
              {comment.likes.length !== 0 && comment.likes.length}
            </span>
            <Hoverable hoverComponent={<UserList title="싫어요;" userIds={comment.dislikes}/>}>
              <CommentDislikesButton commentId={comment._id}/>
            </Hoverable>
            <span className="dislikes-count">
              {comment.dislikes.length !== 0 && `-${comment.dislikes.length}`}
            </span>
            {comment.authorHeart && <AuthorHeart userId={comment.authorHeart}/>}
            {comment.isChild || <button type="button" onClick={this.onAddReply}>답글</button>}
          </div>
        </article>
        {!addReply || <div className="addReply">
          <WriteComment
            postId={comment.post}
            parent={comment._id}
            autofocus
          />
        </div>
        }
        <ChildCommentList childCommentIds={comment.childComments}/>
        {isFetchingNewChildComment && <LoadingSpinner center/> }
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
