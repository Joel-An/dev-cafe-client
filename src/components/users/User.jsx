import React from 'react';
import PropTypes from 'prop-types';
import withUser, { userPropType } from '../../containers/WithUser';

const User = (props) => {
  const { user, renderUser } = props;
  return renderUser(user);
};

User.propTypes = {
  user: userPropType.type.isRequired,
  renderUser: PropTypes.func.isRequired,
};

export const ProfilePic = withUser((props) => {
  const {
    user, height, width, className,
  } = props;
  return user
    ? <img
      className={className}
      alt={`${user.profileName}님의 프로필사진`}
      src={user.profilePic}
      height={height || '40'}
      width={width || '40'}
    />
    : null;
});

export const ProfileName = withUser((props) => {
  const { user } = props;
  return user ? user.profileName : null;
});

export default withUser(User);
