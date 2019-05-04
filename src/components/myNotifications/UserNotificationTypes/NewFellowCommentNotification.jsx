import React from 'react';

import UserNotification, {
  CommentSummary, ProfileName, PostTitle, notificationPropInfo,
} from './UserNotification';

const NewFellowCommentNotification = (props) => {
  const { notification } = props;

  return (
    <UserNotification
      icon={notification.fromWhom}
      linkTo={`/posts/${notification.post._id}`}
      date={notification.date}
    >
      <ProfileName profileName={notification.fromWhom.profileName}/>
      <span>
        {'님도 게시글 '}
        <PostTitle title={notification.post.title}/>
        {'에 댓글을 달았습니다: '}
      </span>
      <CommentSummary markdown={notification.comment.contents}/>
    </UserNotification>
  );
};

NewFellowCommentNotification.propTypes = {
  notification: notificationPropInfo.type.isRequired,
};

export default NewFellowCommentNotification;
