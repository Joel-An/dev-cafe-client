import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMyInfo as fetchMyInfoAction } from '../../store/actions/auth';

import withToken, { tokenPropType } from '../../containers/WithToken';
import { connectComponent } from '../../utils';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import WritePostButton from '../posts/WritePostButton';
import HeaderMenu from './HeaderMenu';

import './Header.scss';

const withTitle = (profileName) => {
  if (profileName.endsWith('님')) {
    return profileName;
  }
  return `${profileName}님`;
};

class Header extends React.Component {
  componentDidMount() {
    const { token, fetchMyInfo } = this.props;
    if (token) {
      fetchMyInfo(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token, fetchMyInfo } = this.props;
    if (nextProps.token && nextProps.token !== token) {
      fetchMyInfo(nextProps.token);
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
        <HeaderMenu/>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  profileName: auth.user.profileName,
});

const mapDispatchToProps = { fetchMyInfo: fetchMyInfoAction };

Header.propTypes = {
  token: tokenPropType.type,
  profileName: PropTypes.string,
  fetchMyInfo: PropTypes.func.isRequired,
};

Header.defaultProps = {
  token: tokenPropType.default,
  profileName: null,
};

export default connectComponent(Header,
  [
    connect(mapStateToProps, mapDispatchToProps),
    withToken,
  ]);
