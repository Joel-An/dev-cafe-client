import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

const LogoutButton = ({ logout }) => (
  <button type="button" onClick={logout}>LOGOUT</button>
);

const mapDispatchToProps = { logout };

export default connect(
  null,
  mapDispatchToProps,
)(LogoutButton);
