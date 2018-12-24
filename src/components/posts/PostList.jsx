import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <ul>
      {posts.map(post => (
        <li id={post._id}>
          <p>
            <Link to={`posts/${post._id}`}>
              제목 : {post.title}<br/>
            </Link>
            카테고리 : {post.category.name}<br/>
            작성자 : {post.author.profileName}<br/>
          </p>
        </li>
      ))
      }
    </ul>
  );
};

export default PostList;
