import React from 'react';

import UserNotification, {
  CommentSummary, ProfileName, PostTitle, notificationPropInfo,
} from './UserNotification';

const NewCommentNotification = (props) => {
  const { notification } = props;

  return (
    <UserNotification
      icon={notification.fromWhom}
      linkTo={`/posts/${notification.post._id}`}
      date={notification.date}
    >
      <ProfileName profileName={notification.fromWhom.profileName}/>
      <span>
        {'님이 회원님의 글 '}
      </span>
      <PostTitle title={notification.post.title}/>
      <span>
        {'에 댓글을 달았습니다: '}
      </span>
      <CommentSummary markdown={notification.comment.contents}/>
    </UserNotification>
  );
};

NewCommentNotification.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default NewCommentNotification;
