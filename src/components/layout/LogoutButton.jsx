import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

const LogoutButton = ({ requestLogout }) => (
  <button type="button" onClick={requestLogout}>LOGOUT</button>
);

const mapDispatchToProps = { requestLogout: logout };

export default connect(
  null,
  mapDispatchToProps,
)(LogoutButton);
