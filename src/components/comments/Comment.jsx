import React from 'react';
import withCommentContainer from '../../containers/CommentContainer';

export const Comment = (props) => {
  const { comment, renderComment } = props;

  return renderComment(comment);
};

export default withCommentContainer(Comment);
