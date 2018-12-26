import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      profileName: '',
    };
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.getUserInfo(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.props;
    if (token !== nextProps.token) {
      this.getUserInfo(nextProps.token);
    }
  }

  getUserInfo = (token) => {
    if (!token) {
      this.setState({ isLoggedIn: false });
      return;
    }
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
    const { logout } = this.props;
    return (
      <header className="main-head">
        <Link to="/">Joel&apos;s Dev Cafe</Link>
        <p>
          {!isLoggedIn || `${profileName}님`} 안녕하세요
          {!isLoggedIn
            ? <Link to="/login" style={{ textDecoration: 'none' }}>
              <button type="button">
                    LOGIN
              </button>
            </Link>
            : <button type="button" onClick={logout}>LOGOUT</button>
          }
        </p>
        <hr />
      </header>
    );
  }
}
Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};
export default Header;
