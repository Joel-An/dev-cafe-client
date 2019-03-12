import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import withPostListItem from '../../containers/WithPostListItem';
import { postPropInfo } from '../../containers/PostContainer';

import Category from '../categories/Category';
import User from '../users/User';

import { extractSummary } from '../../utils';

import './PostListItem.scss';

const renderCategory = category => (
  <span className="category">
    <Link to={`posts?categories=${category._id}`}>
      {`#${category.name}`}
    </Link>
  </span>
);

const renderUser = user => (
  <span>posted by {user.profileName}</span>
);

const PostListItem = (props) => {
  const { post, pageRefProp } = props;
  return (
    <li title={post.title} ref={pageRefProp} className="PostListItem" >
      <h2 className="post-title">
        <Link to={`posts/${post._id}`}>
          {post.title}
        </Link>
      </h2>
      <div className="post-subInfo">
        {
          post.contents && <p className="summary">
            {extractSummary(post.contents)}
          </p>
        }
        <div className="post-meta">
          <span className="date">
            {dateFormat(post.date, 'yy/mm/dd h:MM TT')}
          </span>
          <Category categoryId={post.category} renderCategory={renderCategory} />
          <User userId={post.author} renderUser={renderUser} />
        </div>
      </div>
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
