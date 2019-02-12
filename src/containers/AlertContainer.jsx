import { connect } from 'react-redux';
import React from 'react';

import { openAlert as openAlertAction } from '../store/actions/popups';

export default function withAlertContainer(ComposedComponent) {
  const AlertContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapDispatchToProps = { openAlert: openAlertAction };

  return connect(null, mapDispatchToProps)(AlertContainer);
}
