import React from 'react';
import withUserContainer from '../../containers/UserContainer';

const User = (props) => {
  const { user, renderUser } = props;
  return renderUser(user);
};

export default withUserContainer(User);
