/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import Popup from './Popup';

import withAlertContainer from '../../containers/AlertContainer';
import withAddNotification from '../notifications/WithAddNotification';

import { connectComponent } from '../../utils';

import * as Api from '../../api/auth';
import { loginSucceeded as loginSucceededAction } from '../../store/actions/auth';
import './LoginPopup.scss';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        username: '',
        password: '',
      },
    };
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    const { loginForm } = this.state;

    this.setState({ loginForm: { ...loginForm, [name]: value } });
  };

  handleInputSubmit = (event) => {
    event.preventDefault();
    const { loginForm } = this.state;
    const {
      close, loginSucceeded, openAlert, pos, addNotification,
    } = this.props;

    Api.login(loginForm)
      .then((token) => {
        loginSucceeded(token);
        close();
        addNotification({
          message: '이랏샤이마세!!!',
        });
      })
      .catch((err) => {
        openAlert({
          message: err,
        });
      });
  };

  reqLoginWithGoogle = () => {
    const { openAlert } = this.props;
    openAlert({
      title: 'ㅎ_ㅎ;;',
      message: '준비중입니다 ㅎㅎ',
    });
  }

  reqTesterLogin = () => {
    const { openAlert } = this.props;
    openAlert({
      title: 'ㅎ_ㅎ;;',
      message: '이것도 준비중입니다;',
    });
  }

  render() {
    const {
      loginForm,
    } = this.state;

    const {
      close, pos,
    } = this.props;

    return (
      <Popup pos={pos} close={close} title="LOGIN">
        <div className="LoginPopup">
          <LoginForm
            username={loginForm.username}
            password={loginForm.password}
            onChange={this.handleInputChange}
            onSubmit={this.handleInputSubmit}
          />
          <div className="login-popup-submenu">
            <button type="button" onClick={this.reqLoginWithGoogle}>
              구글로 로그인
            </button>
            <button type="button" onClick={this.reqTesterLogin}>
              테스터 아이디로 로그인
            </button>
          </div>
        </div>
      </Popup>
    );
  }
}

const LoginForm = ({
  username, password, onChange, onSubmit,
}) => (
  <form onSubmit={onSubmit} className="LoginForm">
    <div className="form-element">
      <label htmlFor="username">
          사용자 이름
      </label>
      <input
        name="username"
        autoComplete="username"
        id="username"
        value={username}
        placeholder="username or E-mail"
        type="text"
        onChange={onChange} />
    </div>
    <div className="form-element">
      <label htmlFor="password">
          비밀번호
      </label>
      <input
        autoComplete="current-password"
        name="password"
        id="password"
        value={password}
        placeholder="비밀번호"
        type="password"
        onChange={onChange} />
    </div>
    <div className="login-popup-menu">
      <div className="spacer"/>
      <button type="submit">로그인</button>
    </div>
  </form>
);

const mapDispatchToProps = { loginSucceeded: loginSucceededAction };

export default connectComponent(LoginPopup,
  [
    connect(null, mapDispatchToProps),
    withAlertContainer,
    withAddNotification,
  ]);
