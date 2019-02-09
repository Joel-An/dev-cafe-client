import React from 'react';
import { Link } from 'react-router-dom';

import withPostContainer from '../../containers/PostContainer';
import withMyInfoContainer from '../../containers/MyInfoContainer';

import Category from '../categories/Category';
import User from '../users/User';
import DeletePost from './DeletePost';
import ContentsViewer from '../contents/Viewer';

import './PostView.scss';

const renderCategory = category => (
  <span>카테고리 : {category.name}<br/></span>
);
const renderUser = user => (
  <span>{user.profileName}</span>
);

const PostView = (props) => {
  const { post, myInfo } = props;

  if (!post) {
    return (<p>글이 없어!</p>);
  }

  const isMyPost = (post.author === myInfo._id);

  return (
    <div className="PostView">
      <article className="post">
        <header>
          <h1 className="title">{post.title}</h1>
          <Category categoryId={post.category} renderCategory={renderCategory}/>
          <User userId={post.author} renderUser={renderUser}/>
        </header>
        <section className="post-content">
          <ContentsViewer contents={post.contents || 'Loading...'}/>
        </section>
      </article>
      <div className="post-button-group">
        {isMyPost
        && <>
          <DeletePost postId={post._id} categoryId={post.category}/>
          <button type="button">
            <Link to={`/edit/${post._id}`}>수정</Link>
          </button>
        </>}
        <button type="button">
          목록
        </button>
      </div>


    </div>
  );
};

const PostViewWithMyInfo = withMyInfoContainer(PostView);

export default withPostContainer(PostViewWithMyInfo);
