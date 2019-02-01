import { connect } from 'react-redux';
import React from 'react';

import { selectUserById } from '../store/selectors/users';

export default function withUserContainer(ComposedComponent) {
  const UserContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps;
    const user = selectUserById(state, userId);

    return { user };
  };

  return connect(mapStateToProps)(UserContainer);
}
