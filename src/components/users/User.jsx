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

export default withUser(User);
