import React from 'react';
import PropTypes from 'prop-types';
import withPostContainer, { postPropType } from '../../containers/PostContainer';

const Post = (props) => {
  const { post, renderPost } = props;

  return renderPost(post);
};

Post.propTypes = {
  post: postPropType.type.isRequired,
  renderPost: PropTypes.func.isRequired,
};

export default withPostContainer(Post);
