import React from 'react';
import { Link } from 'react-router-dom';

const PostList = (props) => {
  const { entities, postIds } = props;
  const { categories, posts, users } = entities;

  if (postIds.length === 0) {
    return <p>글이 없어!</p>;
  }

  return (
    <ul className="postList" >
      {postIds.map((id) => {
        const post = posts[id];

        return (
          <li name={post.title} key={post._id}>
            <p>
            제목 :
              <Link to={`posts/${post._id}`}>
                {post.title}<br/>
              </Link>

            카테고리 :
              <Link to={`posts?categories=${categories[post.category]._id}`}>
                {post.category}<br/>
              </Link>
            작성자 : {users[post.author].profileName}<br/>
            </p>
          </li>
        );
      })
      }
    </ul>
  );
};

export default PostList;
