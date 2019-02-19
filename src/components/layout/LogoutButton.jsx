import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

const LogoutButton = ({ requestLogout }) => (
  <button type="button" onClick={requestLogout}>LOGOUT</button>
);

LogoutButton.propTypes = {
  requestLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = { requestLogout: logout };

export default connect(
  null,
  mapDispatchToProps,
)(LogoutButton);
