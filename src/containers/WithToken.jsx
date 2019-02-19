// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return { token };
};

export default function withToken(ComposedComponent) {
  return connect(mapStateToProps, null)(ComposedComponent);
}

export const tokenPropType = {
  type: PropTypes.string,
  default: null,
};
