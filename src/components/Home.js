import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <p>
        <Link to="/users">USERS</Link>
      </p>
      <p>
        <Link to="/posts">POSTS</Link>
      </p>
    </div>
  );
};

export default Home;
