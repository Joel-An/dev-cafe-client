import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerForm: {
        username: '',
        profileName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      redirect: false,
      error: null,
    };
  }

  onChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    const { registerForm } = this.state;

    this.setState({ registerForm: { ...registerForm, [name]: value } });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { registerForm } = this.state;
    this.register(registerForm);
  }

  register = (registerForm) => {
    axios
      .post('/api/v1/users', registerForm)
      .then((result) => {
        if (result.status === 201) {
          this.setState({ redirect: true });
        }
      })
      .catch((err) => {
        this.setState({ error: err.response.data.message });
      });
  };

  render() {
    const {
      registerForm, redirect, error,
    } = this.state;

    if (redirect) {
      return <Redirect to="/"/>;
    }

    return (
      <div align="center">
        <RegisterForm
          username={registerForm.username}
          profileName={registerForm.profileName}
          email={registerForm.email}
          password={registerForm.password}
          confirmPassword={registerForm.confirmPassword}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <div>{error}</div>
      </div>
    );
  }
}

const RegisterForm = ({
  username,
  profileName,
  email,
  password,
  confirmPassword,
  onSubmit,
  onChange,
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <legend>회원가입</legend>
      <div>
        <label htmlFor="username">
          사용자 이름(ID)
          <input
            name="username"
            id="username"
            value={username}
            placeholder="사용자 이름"
            type="text"
            onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="profileName">
          프로필 이름
          <input
            name="profileName"
            id="profileName"
            value={profileName}
            placeholder="프로필 이름"
            type="text"
            onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          이메일
          <input
            name="email"
            id="email"
            value={email}
            placeholder="E-mail"
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
      <div>
        <label htmlFor="confirmPassword">
          비밀번호 확인
          <input
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange} />
        </label>
      </div>
      <button type="submit">회원가입</button>

    </form>
  </div>
);

RegisterForm.propTypes = {
  username: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Signup;
