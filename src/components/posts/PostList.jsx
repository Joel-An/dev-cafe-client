import React from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

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
              <Link to={`posts?categories=${post.category}`}>
                {categories[post.category].name}<br/>
              </Link>
            작성자 : {users[post.author].profileName}<br/>
            작성 시간 : {dateFormat(post.date, 'yy/mm/dd h:MM TT')}<br/>
            </p>
          </li>
        );
      })
      }
    </ul>
  );
};

export default PostList;
