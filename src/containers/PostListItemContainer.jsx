import { connect } from 'react-redux';
import React from 'react';

import { selectPostById } from '../store/selectors/posts';

export default function withPostListItemContainer(ComposedComponent) {
  const PostListItemContainer = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const post = selectPostById(state, postId);

    return { post };
  };

  return connect(mapStateToProps)(PostListItemContainer);
}
