import React from 'react';

import CommentLikes from './UserNotificationTypes/CommentLikesNotification';
import AuthorHeart from './UserNotificationTypes/AuthorHeartNotification';
import NewComment from './UserNotificationTypes/NewCommentNotification';
import NewFellowComment from './UserNotificationTypes/NewFellowCommentNotification';
import NewReply from './UserNotificationTypes/NewReplyNotification';
import NewFellowReply from './UserNotificationTypes/NewFellowReplyNotification';

import { notificationPropInfo } from './UserNotificationTypes/UserNotification';

const NOTIFICATION_TYPES = {
  COMMENT_LIKES: CommentLikes,
  AUTHOR_HEART: AuthorHeart,
  NEW_COMMENT_ON_MY_POST: NewComment,
  NEW_FELLOW_COMMENT: NewFellowComment,
  NEW_REPLY_ON_MY_COMMENT: NewReply,
  NEW_FELLOW_REPLY: NewFellowReply,
};

const UserNotificationSwitcher = (props) => {
  const { notification } = props;
  const Notification = NOTIFICATION_TYPES[notification.type];

  return Notification
    ? <Notification notification={notification}/>
    : <div>에러! 알수 없는 알림!</div>;
};

UserNotificationSwitcher.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default UserNotificationSwitcher;
