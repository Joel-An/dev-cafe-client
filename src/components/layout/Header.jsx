import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUserInfo as fetchUserInfoAction } from '../../store/actions/auth';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { token, fetchUserInfo } = this.props;
    if (token) {
      fetchUserInfo(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token, fetchUserInfo } = this.props;
    if (nextProps.token && nextProps.token !== token) {
      fetchUserInfo(nextProps.token);
    }
  }

  render() {
    const { profileName } = this.props;
    return (
      <header className="main-head">
        <div className="spacer"/>
        <h1 className="title">
          <Link to="/">Joel&apos;s Dev Cafe</Link>
        </h1>
        <nav className="header-menu">
          <span className="greeting">
            {!profileName || `${profileName}님`} 안녕하세요
          </span>
          {!profileName
            ? <>
                <LoginButton/>
                <Link to="/signup">
                  <button type="button">
                    SIGNUP
                  </button>
                </Link>
            </>
            : <LogoutButton/>
          }
          <Link to="/admin">
            <button type="button">
              ADMIN
            </button>
          </Link>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  profileName: auth.user.profileName,
});

const mapDispatchToProps = { fetchUserInfo: fetchUserInfoAction };

Header.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
