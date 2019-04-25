import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import User from './User';

const renderUser = user => <div>
  <img alt={`@${user.profileName}`} height="200" width="200" src={user.profilePic}/>
  <p>{user.profileName}</p>
</div>;

const UserPage = (props) => {
  const { match } = props;
  const { userId } = match.params;

  return (
    <div className="UserPage">
      사용자 페이지!
      <User userId={userId} renderUser={renderUser}/>
    </div>
  );
};

UserPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default UserPage;
