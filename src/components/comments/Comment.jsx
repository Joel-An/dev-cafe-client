import React from 'react';
import PropTypes from 'prop-types';
import withComment, { commentPropInfo } from '../../containers/WithComment';

export const Comment = (props) => {
  const { comment, renderComment } = props;

  return renderComment(comment);
};

Comment.propTypes = {
  comment: commentPropInfo.type.isRequired,
  renderComment: PropTypes.func.isRequired,
};

export default withComment(Comment);
