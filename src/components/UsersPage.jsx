import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class UsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = { users: null };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get('/api/v1/users')
      .then(result => this.setUsers(result.data))
      .catch(err => console.log(err));
  };

  setUsers = (users) => {
    this.setState({ users });
  };


  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Users</h2>
        {users && <Table users={users} />}
      </div>
    );
  }
}

const Table = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user._id}>
        <p>
          {user.profileName}&nbsp;&nbsp;
          {user.email}
        </p>
      </li>
    ))}
  </ul>
);

Table.propTypes = {
  users: PropTypes.shape([{ _id: 'id', username: 'username' }]).isRequired,
};


export default UsersPage;
