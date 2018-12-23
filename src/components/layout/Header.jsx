import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      profileName: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);
    }
  }

  getUserInfo = (token) => {
    const headers = {
      'x-access-token': token,
    };
    axios.get('/api/v1/users/me', { headers })
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            profileName: result.data.myInfo.profileName,
            isLoggedIn: true,
          });
        }
      })
      .catch((err) => {
        console.error(err.data);
      });
  }

  render() {
    const { profileName, isLoggedIn } = this.state;
    return (
      <header className="main-head">
        <Link to="/">Joel&apos;s Dev Cafe</Link>
        <p>{!isLoggedIn || `${profileName}님`} 안녕하세요</p>
        <hr />
      </header>);
  }
}

export default Header;
