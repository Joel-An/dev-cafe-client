import React from 'react';

import Post from './Post';
import Category from '../categories/Category';
import User from '../users/User';
import CommentArea from '../comments/CommentArea';

const renderPost = (post) => {
  if (!post) {
    return (<p>글이 없어!</p>);
  }

  const renderCategory = category => (
    <p>카테고리 : {category.name}</p>
  );
  const renderUser = user => (
    <p>작성자 : {user.profileName}</p>
  );

  return (
    <p>
      제목 : {post.title}<br/>
      <Category categoryId={post.category} renderCategory={renderCategory}/>
      <User userId={post.author} renderUser={renderUser}/>
      내용 : {post.contents || 'Loading...'}
    </p>
  );
};

const PostPage = (props) => {
  const { match } = props;
  const { id: postId } = match.params;

  return (
    <div>
      <Post postId={postId} renderPost={renderPost}/>
      <CommentArea
        postId={postId}
      />
    </div>
  );
};

export default PostPage;
