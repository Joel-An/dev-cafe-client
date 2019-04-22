import React from 'react';
import { Link } from 'react-router-dom';
import User from './User';

import './UserList.scss';

const renderUser = user => (
  <div className="user">
    <Link to={`/users/${user._id}`}>
      <img className="user-list-profile-pic" alt={`@${user.profileName}`} height="33" width="33" src={user.profilePic}/>
    </Link>
    <div>
      <Link to={`/users/${user._id}`}>{user.profileName}</Link>
    </div>
  </div>
);

const UserList = (props) => {
  const { userIds, className, title } = props;

  if (!userIds.length) {
    return null;
  }

  return (
    <div className={className || 'UserList'}>
      <div className="title">{title}</div>
      {userIds.map(userId => <User
        userId={userId}
        key={userId}
        renderUser={renderUser}
      />)}
    </div>
  );
};

export default UserList;
