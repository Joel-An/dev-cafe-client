import React from 'react';
import PropTypes from 'prop-types';
import withPostContainer, { postPropInfo } from '../../containers/PostContainer';

const Post = (props) => {
  const { post, renderPost } = props;

  return renderPost(post);
};

Post.propTypes = {
  post: postPropInfo.type.isRequired,
  renderPost: PropTypes.func.isRequired,
};

export default withPostContainer(Post);
