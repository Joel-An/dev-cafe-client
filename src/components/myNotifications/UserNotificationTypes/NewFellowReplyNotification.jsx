import React from 'react';

import UserNotification, { CommentSummary, ProfileName, notificationPropInfo } from './UserNotification';

const NewFellowReplyNotification = (props) => {
  const { notification } = props;

  const { post, date } = notification;
  const fromUser = notification.fromWhom;
  const newReply = notification.comment;
  const comment = notification.parentComment;
  const commentAuthor = comment.author;

  return (
    <UserNotification
      icon={fromUser}
      linkTo={`/posts/${post._id}`}
      date={date}
    >
      <ProfileName profileName={fromUser.profileName}/>
      {'님도 '}
      <ProfileName profileName={commentAuthor.profileName}/>
      <span>
        {'님의 댓글 '}
      </span>
      <CommentSummary markdown={comment.contents}/>
      <span>
        {'에 답글을 달았습니다: '}
      </span>
      <CommentSummary markdown={newReply.contents}/>
    </UserNotification>
  );
};

NewFellowReplyNotification.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default NewFellowReplyNotification;
