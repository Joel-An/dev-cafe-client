import React from 'react';

import withPostListContainer from '../../containers/PostListContainer';

import PostListItem from './PostListItem';

const PostList = (props) => {
  const { postsMeta } = props;

  if (!postsMeta || postsMeta.isFetching) {
    return <p>Loading...</p>;
  }

  if (postsMeta.ids.length === 0) {
    return <p>글이 없어!</p>;
  }

  return (
    <ul className="postList" >
      {postsMeta.ids.map(postId => (
        <PostListItem postId={postId} key={postId}/>
      ))
      }
    </ul>
  );
};

export default withPostListContainer(PostList);
