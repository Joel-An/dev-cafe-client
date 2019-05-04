import React from 'react';
import { Link } from 'react-router-dom';
import { ProfilePic, ProfileName } from './User';

import './UserList.scss';

const UserList = (props) => {
  const { userIds, className, title } = props;

  if (!userIds.length) {
    return null;
  }

  return (
    <div className={className || 'UserList'}>
      <div className="title">{title}</div>
      {userIds.map(userId => <div className="user" key={userId}>
        <Link to={`/users/${userId}`}>
          <ProfilePic className="user-list-profile-pic" userId={userId} height="33" width="33"/>
        </Link>
        <Link to={`/users/${userId}`}>
          <ProfileName userId={userId}/>
        </Link>
      </div>)}
    </div>
  );
};

export default UserList;
