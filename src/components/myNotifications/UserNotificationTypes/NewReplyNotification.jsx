import React from 'react';

import UserNotification, { CommentSummary, ProfileName, notificationPropInfo } from './UserNotification';

const NewReplyNotification = (props) => {
  const { notification } = props;

  return (
    <UserNotification
      icon={notification.fromWhom}
      linkTo={`/posts/${notification.post._id}`}
      date={notification.date}
    >
      <ProfileName profileName={notification.fromWhom.profileName}/>
      <span>
        {'님이 회원님의 댓글 '}
      </span>
      <CommentSummary markdown={notification.parentComment.contents}/>
      <span>
        {'에 답글을 달았습니다: '}
      </span>
      <CommentSummary markdown={notification.comment.contents}/>
    </UserNotification>
  );
};

NewReplyNotification.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default NewReplyNotification;
