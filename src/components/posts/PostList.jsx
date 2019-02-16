import React from 'react';

import withPostListContainer from '../../containers/PostListContainer';

import PostListItem from './PostListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const PostList = (props) => {
  const { postsMeta } = props;

  if (!postsMeta || (postsMeta.isFetching && postsMeta.ids.length === 0)) {
    return <LoadingSpinner/>;
  }

  if (postsMeta.ids.length === 0) {
    return <p>글이 없어!</p>;
  }

  return (
    <ul className="postList" >
      {postsMeta.isFetching && <LoadingSpinner key="isLoading"/>}
      {postsMeta.ids.map(postId => (
        <PostListItem postId={postId} key={postId}/>
      ))
      }
    </ul>
  );
};

export default withPostListContainer(PostList);
