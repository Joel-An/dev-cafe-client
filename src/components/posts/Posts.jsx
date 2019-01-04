import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import withPostListContainer from '../../containers/PostListContainer';

const Posts = (props) => {
  const { entities, postsByCategory, category } = props;

  const postsInfo = postsByCategory[category];
  const isFetching = (typeof postsInfo === 'undefined') || postsInfo.isFetching;

  return (
    <div>
      {isFetching
        ? 'Loading posts....'
        : <PostList entities={entities} postIds={postsInfo.ids}/>
      }
      <button type="button">
        <Link to={`/write/${category}`}>글쓰기</Link>
      </button>
    </div>
  );
};

export default withPostListContainer(Posts);
