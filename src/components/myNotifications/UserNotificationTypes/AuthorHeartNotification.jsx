import React from 'react';

import UserNotification, { CommentSummary, ProfileName, notificationPropInfo } from './UserNotification';

const CommentLikesNotification = (props) => {
  const { notification } = props;

  return (
    <UserNotification
      icon={notification.fromWhom}
      linkTo={`/posts/${notification.post._id}`}
      date={notification.date}
    >
      <ProfileName profileName={notification.fromWhom.profileName}/>
      <span>
        {'님이 회원님의 댓글에 하트를 줬습니다: '}
      </span>
      <CommentSummary markdown={notification.comment.contents}/>
    </UserNotification>
  );
};

CommentLikesNotification.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default CommentLikesNotification;
