import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ProfilePic, ProfileName } from './User';

const UserPage = (props) => {
  const { match } = props;
  const { userId } = match.params;

  return (
    <div className="UserPage">
      사용자 페이지!
      <div>
        <ProfileName userId={userId}/>
      </div>
      <ProfilePic userId={userId} height="200" width="200"/>

    </div>
  );
};

UserPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default UserPage;
