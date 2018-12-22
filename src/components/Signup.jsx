import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  render() {
    const a = 'eew';
    return <div align="center">Signup</div>;
  }
}

const LoginForm = ({
  email, password, onChange, onSubmit,
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <legend>로그인</legend>
      <div>
        <label>이메일</label>
        <input name="email" value={email} placeholder="E-mail" type="text" onChange={onChange} />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={onChange}
        />
      </div>
      <input type="submit" value="로그인" />
    </form>
  </div>
);

export default Signup;
