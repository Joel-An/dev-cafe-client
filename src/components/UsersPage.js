import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

class UsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = { users: null };
  }

  getUsers = () => {
    axios
      .get('/api/v1/users')
      .then(result => this.setUsers(result.data))
      .catch(err => console.log(err));
  };

  setUsers = users => {
    this.setState({ users });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Header as="h2">Users</Header>
        {users && <Table users={users} />}
      </div>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        {users.map(user => (
          <div key={user._id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default UsersPage;
