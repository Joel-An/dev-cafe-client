import { connect } from 'react-redux';
import React from 'react';

import { addNotification } from '../../store/actions/notifications';

export default function WithAddNotification(ComposedComponent) {
  const AddNotification = props => (
    <ComposedComponent {...props} />
  );

  const mapDispatchToProps = { addNotification };

  return connect(null, mapDispatchToProps)(AddNotification);
}
