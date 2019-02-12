import React from 'react';
import { connect } from 'react-redux';
import Popup from './Popup';

import { login } from '../../store/actions/auth';
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
    this.props.login(loginForm);
  };

  render() {
    const {
      loginForm,
    } = this.state;

    const {
      close, error, pos,
    } = this.props;

    const style = { position: 'absolute', top: pos.y + 30, left: pos.x };

    return (
      <Popup style={style} close={close}>
        <LoginForm
          username={loginForm.username}
          password={loginForm.password}
          onChange={this.handleInputChange}
          onSubmit={this.handleInputSubmit}
        />
        <div>
          <button type="button"> 구글로 로그인</button>
        </div>
        <div>{error}</div>
      </Popup>
    );
  }
}

const LoginForm = ({
  username, password, onChange, onSubmit,
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">
          사용자 이름
          <input
            name="username"
            id="username"
            value={username}
            placeholder="username or E-mail"
            type="text"
            onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          비밀번호
          <input
            name="password"
            id="password"
            value={password}
            placeholder="비밀번호"
            type="password"
            onChange={onChange} />
        </label>
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
);

const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
