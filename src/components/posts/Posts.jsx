import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import withPostListContainer from '../../containers/PostListContainer';

const Posts = (props) => {
  const error = true;
  console.log(props);

  return (
    <div>
      {error
        ? '글이 없어!'
        : <PostList posts={posts}/>
      }
      <div>
        <Link to="/write">글쓰기</Link>
      </div>
    </div>
  );
};

export default withPostListContainer(Posts);
