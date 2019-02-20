/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import './SignUP.scss';

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
      <div className="SignUpPage">
        <RegisterForm
          username={registerForm.username}
          profileName={registerForm.profileName}
          email={registerForm.email}
          password={registerForm.password}
          confirmPassword={registerForm.confirmPassword}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <div className="regster-error">
          {error}
        </div>
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
  <div className="RegisterForm">
    <form onSubmit={onSubmit}>
      <legend><h1>회원가입</h1></legend>
      <div className="register-form-element">
        <label htmlFor="username">
          사용자 이름(ID)
        </label>
        <input
          name="username"
          id="username"
          value={username}
          autoComplete="username"
          placeholder="사용자 이름"
          type="text"
          onChange={onChange} />
      </div>
      <div className="register-form-element">
        <label htmlFor="profileName">
          프로필 이름
        </label>
        <input
          name="profileName"
          id="profileName"
          value={profileName}
          placeholder="프로필 이름"
          type="text"
          onChange={onChange} />
      </div>
      <div className="register-form-element">
        <label htmlFor="email">
          이메일
        </label>
        <input
          name="email"
          id="email"
          value={email}
          autoComplete="email"
          placeholder="E-mail"
          type="text"
          onChange={onChange} />
      </div>
      <div className="register-form-element">
        <label htmlFor="password">
          비밀번호
        </label>
        <input
          name="password"
          id="password"
          autoComplete="new-password"
          value={password}
          placeholder="비밀번호"
          type="password"
          onChange={onChange} />
      </div>
      <div className="register-form-element">
        <label htmlFor="confirmPassword">
          비밀번호 확인
        </label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          placeholder="비밀번호 확인"
          type="password"
          onChange={onChange} />
      </div>
      <div className="register-form-menu">
        <div className="spacer"/>
        <button type="submit">
          회원가입
        </button>
      </div>
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
