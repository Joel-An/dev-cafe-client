import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connectComponent, removeTitle } from '../../utils';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import WritePostButton from '../posts/WritePostButton';
import UserNotificationMenu from '../myNotifications/UserNotificationMenu';
import DropDownMenu from '../common/DropDownMenu';

import './HeaderMenu.scss';

const HeaderMenu = (props) => {
  const { myInfo } = props;
  return (
    <nav className="header-menu">
      <div className="spacer" />
      <div className="header-menu-wrapper">
        <span className="greeting">
          {myInfo.isGuest || `${removeTitle(myInfo.profileName)}님`} 안녕하세요
        </span>
        { myInfo.isGuest
          ? <LoginButton/>
          : <LogoutButton/>
        }
        {myInfo.isGuest || <UserNotificationMenu />}
        <DropDownMenu
          className="header-toggle-menu"
          toggleIcon={<FontAwesomeIcon icon="bars"/>}
        >
          <Fragment>
            <Link to="/admin">
              ADMIN
            </Link>
            {myInfo.isGuest
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
          </Fragment>
        </DropDownMenu>
      </div>
    </nav>
  );
};

HeaderMenu.propTypes = {
  myInfo: myInfoPropType.type,
};

HeaderMenu.defaultProps = {
  myInfo: myInfoPropType.default,
};

export default connectComponent(HeaderMenu,
  [
    withMyInfo,
  ]);
