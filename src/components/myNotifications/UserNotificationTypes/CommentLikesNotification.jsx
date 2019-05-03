import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNotification from './UserNotification';

import { extractSummary, removeTitle } from '../../../utils';

const CommentLikesNotification = (props) => {
  const { notification } = props;

  return (
    <UserNotification
      icon={notification.fromWhom}
      linkTo={`/posts/${notification.post._id}`}
      date={notification.date}
    >
      <span className="profileName">
        {removeTitle(notification.fromWhom.profileName)}
      </span>
      <span>
        {'님이 내 댓글을 좋아합니다: '}
      </span>
      <span>
        {` "${extractSummary(notification.comment.contents, 30)}"`}
      </span>
    </UserNotification>
  );
};

export default CommentLikesNotification;
