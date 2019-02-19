import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const getCategoryId = (query) => {
  const categoryId = query.slice(query.indexOf('=') + 1);
  return categoryId;
};

const PostListPage = (props) => {
  const { location } = props;
  const { search: query } = location;
  const categoryId = getCategoryId(query);

  return (
    <div className="PostListPage">
      <Link to={`/write/${categoryId}`}>
        <button type="button">
          글쓰기
        </button>
      </Link>
      <PostList categoryId={categoryId}/>
    </div>
  );
};

PostListPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default PostListPage;
