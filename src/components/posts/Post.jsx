import React from 'react';
import withPostContainer from '../../containers/PostContainer';

const Post = (props) => {
  const { post, renderPost } = props;

  return renderPost(post);
};

export default withPostContainer(Post);
