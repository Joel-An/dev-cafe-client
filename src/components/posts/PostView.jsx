import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import dateFormat from 'dateformat';

import withPostContainer, { postPropInfo } from '../../containers/PostContainer';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent, extractSummary } from '../../utils';

import Category from '../categories/Category';
import User from '../users/User';
import DeletePost from './DeletePost';
import ContentsViewer from '../contents/Viewer';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import './PostView.scss';

const renderCategory = category => (
  <span>#{category.name}</span>
);
const renderUser = user => (
  <span>posted by {user.profileName}</span>
);

const PostView = (props) => {
  const { post, myInfo, lastVisitedCategoryId } = props;

  if (!post) {
    return (<p>글이 없어!</p>);
  }

  const isMyPost = (post.author === myInfo._id);

  const url = `https://rejoelve.com/posts/${post._id}`;
  const summary = extractSummary(post.contents);
  return (
    <Fragment>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={summary}/>
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={summary} />
      </Helmet>
      <div className="PostView">
        <article className="post">
          <header>
            <h1 className="title">{post.title}</h1>
            <div className="post-subInfo">
              <Category categoryId={post.category} renderCategory={renderCategory}/>
              <User userId={post.author} renderUser={renderUser}/>
              <span className="date">
                {dateFormat(post.date, 'yy/mm/dd h:MM TT')}
              </span>
            </div>
          </header>
          <section className="post-content markdown">
            {post.contents
              ? <ContentsViewer contents={post.contents}/>
              : <LoadingSpinner/>
            }
          </section>
        </article>
        <div className="post-button-group">
          {isMyPost
        && <>
          <DeletePost postId={post._id} categoryId={lastVisitedCategoryId}/>
            <Link to={`/edit/${post._id}`}>
              <button type="button">
                수정
              </button>
            </Link>
        </>}
          <Link to={`/posts?category=${lastVisitedCategoryId}`}>
            <button type="button">
            목록
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

PostView.propTypes = {
  myInfo: myInfoPropType.type,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
  post: postPropInfo.type,
};

PostView.defaultProps = {
  myInfo: myInfoPropType.default,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
  post: postPropInfo.default,
};

export default connectComponent(PostView,
  [
    withMyInfo,
    withLastVisitedCategoryId,
    withPostContainer,
  ]);
