import React from 'react';
import { Link } from 'react-router-dom';

import withPostContainer from '../../containers/PostContainer';
import withMyInfoContainer from '../../containers/MyInfoContainer';

import Category from '../categories/Category';
import User from '../users/User';
import DeletePost from './DeletePost';

const renderCategory = category => (
  <p>카테고리 : {category.name}</p>
);
const renderUser = user => (
  <p>작성자 : {user.profileName}</p>
);

const PostView = (props) => {
  const { post, myInfo } = props;

  if (!post) {
    return (<p>글이 없어!</p>);
  }

  const isMyPost = (post.author === myInfo._id);

  return (
    <p>
      제목 : {post.title}<br/>
      <Category categoryId={post.category} renderCategory={renderCategory}/>
      <User userId={post.author} renderUser={renderUser}/>
      내용 : {post.contents || 'Loading...'}
      {isMyPost
      && <>
        <DeletePost postId={post._id} categoryId={post.category}/>
        <button type="button">
          <Link to={`/edit/${post._id}`}>수정</Link>
        </button>
      </>
      }
    </p>
  );
};

const PostViewWithMyInfo = withMyInfoContainer(PostView);

export default withPostContainer(PostViewWithMyInfo);
