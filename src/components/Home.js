import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <p>Hello World</p>
      <p>
        <Link to="/users">USERS</Link>
      </p>
      <p>
        <Link to="/posts">POSTS</Link>
      </p>
    </Layout>
  );
};

export default Home;
