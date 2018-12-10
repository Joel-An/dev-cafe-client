import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <LoginForm
          email={email}
          password={password}
          onChange={this.handleInputChange}
        />
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        <div>
          <button> 구글로 로그인</button>
        </div>
      </div>
    );
  }
}

const LoginForm = ({ email, password, onChange }) => {
  return (
    <div>
      <form>
        <legend>로그인</legend>
        <div>
          <label>이메일</label>
          <input
            name="email"
            value={email}
            placeholder="E-mail"
            type="text"
            onChange={onChange}
          />
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
};

export default Login;
