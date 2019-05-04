import React from 'react';
import { Link } from 'react-router-dom';

import { fromNow, extractSummary, removeTitle } from '../../../utils';
import './UserNotification.scss';

const UserNotification = (props) => {
  const {
    icon, children, linkTo, date,
  } = props;

  return (
    <Link
      to={linkTo || '/'}
      className="user-notification">
      <div className="user-notification-header">
        <img
          alt={`${icon.profileName}님의 프로필사진`}
          src={icon.profilePic}
          height="40"
          width="40"
        />
      </div>
      <div className="user-notification-body">
        <div className="user-notification-message">
          {children}
        </div>
        <div className="time-ago">
          {fromNow(date)}
        </div>
      </div>
    </Link>
  );
};

export const CommentSummary = (props) => {
  const { markdown } = props;

  return (
    <span className="comment-contents">
      {`"${extractSummary(markdown)}"`}
    </span>
  );
};

export const ProfileName = (props) => {
  const { profileName } = props;

  return (
    <span className="profileName">
      {removeTitle(profileName)}
    </span>
  );
};

export const PostTitle = (props) => {
  const { title } = props;

  return (
    <span className="post-title" >
      {title}
    </span>
  );
};
export default UserNotification;
