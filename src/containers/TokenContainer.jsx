import { connect } from 'react-redux';
import React from 'react';

export default function withTokenContainer(ComposedComponent) {
  const TokenContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state) => {
    const { token } = state.auth;

    return { token };
  };


  return connect(mapStateToProps, null)(TokenContainer);
}
