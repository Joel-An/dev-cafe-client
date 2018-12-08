import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import Layout from './Layout';

class PostsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: null };
  }

  getPosts = () => {
    axios
      .get('/api/v1/posts')
      .then(result => this.setPosts(result.data))
      .catch(err => console.log(err));
  };

  setPosts = posts => {
    this.setState({ posts });
  };

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts } = this.state;
    return (
      <Layout>
        <Header as="h2">Posts</Header>
        {posts && <Table posts={posts} />}
      </Layout>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        {posts.map(user => (
          <div key={user._id}>
            <span>{user.title}</span>
            <span>{user.authorInfo.name}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default PostsPage;
