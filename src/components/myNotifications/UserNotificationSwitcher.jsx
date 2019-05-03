import React from 'react';

import CommentLikes from './UserNotificationTypes/CommentLikesNotification';
import AuthorHeart from './UserNotificationTypes/AuthorHeartNotification';

const NOTIFICATION_TYPES = {
  COMMENT_LIKES: CommentLikes,
  AUTHOR_HEART: AuthorHeart,
};

const UserNotificationSwitcher = (props) => {
  const { notification } = props;
  const Notification = NOTIFICATION_TYPES[notification.type];

  return Notification
    ? <Notification notification={notification}/>
    : <div>에러! 알수 없는 알림!</div>;
};

export default UserNotificationSwitcher;
