import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connectComponent } from '../../utils';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import WritePostButton from '../posts/WritePostButton';
import './HeaderMenu.scss';

const withTitle = (profileName) => {
  if (profileName.endsWith('님')) {
    return profileName;
  }
  return `${profileName}님`;
};

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
    };
    this.menu = createRef();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  showMenu = () => {
    this.setState({ isToggled: true }, () => {
      document.addEventListener('click', this.hideMenu);
    });
  }

  hideMenu = () => {
    this.setState({ isToggled: false }, () => {
      document.removeEventListener('click', this.hideMenu);
    });
  }

  toggleMenu = () => {
    const { isToggled } = this.state;

    return isToggled ? this.hideMenu() : this.showMenu();
  }

  render() {
    const { isToggled } = this.state;
    const { myInfo } = this.props;
    const { profileName } = myInfo;
    return (
      <nav className="header-menu">
        <div className="spacer" />
        <div className="header-menu-wrapper">
          <span className="greeting">
            {!profileName || `${withTitle(profileName)}`} 안녕하세요
          </span>
          { profileName
            ? <LogoutButton/>
            : <LoginButton/>
          }
          <div className="dd-menu-wrapper">
            <button type="button" className="toggle-button" onClick={this.toggleMenu}>
              <FontAwesomeIcon icon="bars" color={isToggled ? 'black' : 'white'}/>
            </button>
            {isToggled && <div className="menu-list" ref={this.menu}>
              <Link to="/admin">
              ADMIN
              </Link>
              {!profileName
                ? <>
                <Link to="/signup">
                    SIGNUP
                </Link>
            </>
                : <>

            <WritePostButton/>
            <Link to="/mypage">
              MY PAGE
            </Link>
            </>
              }


            </div>}
          </div>
        </div>
      </nav>
    );
  }
}

HeaderMenu.propTypes = {
  myInfo: myInfoPropType.type.isRequired,
};

export default connectComponent(HeaderMenu,
  [
    withMyInfo,
  ]);
