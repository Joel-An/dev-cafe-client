import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fromNow, extractSummary, removeTitle } from '../../../utils';
import { userPropType, userIdPropType } from '../../../containers/WithUser';
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

UserNotification.propTypes = {
  icon: userPropType.type.isRequired,
  children: PropTypes.node.isRequired,
  linkTo: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export const CommentSummary = (props) => {
  const { markdown } = props;

  return (
    <span className="comment-contents">
      {`"${extractSummary(markdown)}"`}
    </span>
  );
};

CommentSummary.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export const ProfileName = (props) => {
  const { profileName } = props;

  return (
    <span className="profileName">
      {removeTitle(profileName)}
    </span>
  );
};

ProfileName.propTypes = {
  profileName: PropTypes.string.isRequired,
};

export const PostTitle = (props) => {
  const { title } = props;

  return (
    <span className="post-title" >
      {title}
    </span>
  );
};

PostTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const notificationType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  fromWhom: userPropType.type.isRequired,
  userId: userIdPropType.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
  }),
  parentComment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profileName: PropTypes.string.isRequired,
    }),
  }),
});

export const notificationPropInfo = {
  type: notificationType,
};

export default UserNotification;
