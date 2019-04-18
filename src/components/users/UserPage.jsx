import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import User from './User';

const renderUser = user => <div>{user.profileName}</div>;

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
