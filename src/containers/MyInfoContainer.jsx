import { connect } from 'react-redux';
import React from 'react';

import { selectMyInfo } from '../store/selectors/auth';

export default function withMyInfoContainer(ComposedComponent) {
  const MyInfoContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state) => {
    const myInfo = selectMyInfo(state);

    return { myInfo };
  };


  return connect(mapStateToProps)(MyInfoContainer);
}
