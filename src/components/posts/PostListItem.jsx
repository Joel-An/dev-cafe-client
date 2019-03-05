import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import withPostListItem from '../../containers/WithPostListItem';
import { postPropInfo } from '../../containers/PostContainer';

import Category from '../categories/Category';
import User from '../users/User';

import './PostListItem.scss';

const renderCategory = category => (
  <span>
    카테고리 :
    <Link to={`posts?categories=${category._id}`}>
      {category.name}
    </Link>
  </span>
);

const renderUser = user => (
  <span>작성자 : {user.profileName}</span>
);

const PostListItem = (props) => {
  const { post, pageRefProp } = props;
  return (
    <li title={post.title} ref={pageRefProp} className="PostListItem" >
      <h1>
        <Link to={`posts/${post._id}`}>
          {post.title}
        </Link>
      </h1>
      <p>
        <Category categoryId={post.category} renderCategory={renderCategory} />
        <br/>
        <User userId={post.author} renderUser={renderUser} />
        <br/>
        작성 시간 : {dateFormat(post.date, 'yy/mm/dd h:MM TT')}<br/>
      </p>
    </li>
  );
};

if (!process.env.BROWSER) {
  // Node 서버의 Element polyfill
  global.Element = null;
}

PostListItem.propTypes = {
  post: postPropInfo.type.isRequired,
  pageRefProp: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

PostListItem.defaultProps = {
  pageRefProp: undefined,
};

export default withPostListItem(PostListItem);
