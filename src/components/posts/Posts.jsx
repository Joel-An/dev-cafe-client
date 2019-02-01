import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const getCategoryId = (query) => {
  const categoryId = query.slice(query.indexOf('=') + 1);
  return categoryId;
};

const Posts = (props) => {
  const { location } = props;
  const { search: query } = location;
  const categoryId = getCategoryId(query);

  return (
    <div>
      <PostList categoryId={categoryId}/>
      <button type="button">
        <Link to={`/write/${categoryId}`}>글쓰기</Link>
      </button>
    </div>
  );
};

export default Posts;
