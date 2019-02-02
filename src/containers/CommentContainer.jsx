import { connect } from 'react-redux';
import React from 'react';

import { selectCommentById } from '../store/selectors/comments';

export default function withCommentContainer(ComposedComponent) {
  const CommentContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state, ownProps) => {
    const { commentId } = ownProps;
    const comment = selectCommentById(state, commentId);

    return { comment };
  };

  return connect(mapStateToProps)(CommentContainer);
}
