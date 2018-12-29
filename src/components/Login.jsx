import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../store/actions/auth';

class Login extends React.Component {
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
      loginForm, error,
    } = this.state;

    if (this.props.token) {
      return <Redirect to="/"/>;
    }

    return (
      <div>
        <LoginForm
          username={loginForm.username}
          password={loginForm.password}
          onChange={this.handleInputChange}
          onSubmit={this.handleInputSubmit}
        />
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        <div>
          <button type="button"> 구글로 로그인</button>
        </div>
        <div>{error}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.payload,
});

const mapDispatchToProps = { login };

Login.propTypes = {
};

const LoginForm = ({
  username, password, onChange, onSubmit,
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <legend>로그인</legend>
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
