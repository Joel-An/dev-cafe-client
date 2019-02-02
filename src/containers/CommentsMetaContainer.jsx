import { connect } from 'react-redux';
import React from 'react';

import { loadComments as loadCommentsAction } from '../store/actions/comments';

export default function withCommentsMetaContainer(ComposedComponent) {
  class CommentsMetaContainer extends React.Component {
    componentDidMount() {
      const { postId, loadComments } = this.props;

      loadComments(postId);
    }

    componentWillReceiveProps(nextProps) {
      const { postId, loadComments } = this.props;
      if (postId !== nextProps.postId) {
        loadComments(nextProps.postId);
      }
    }

    render() {
      const newProps = { ...this.props };
      delete newProps.loadComments;

      return (
        <ComposedComponent {...newProps} />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const { entities, pagination } = state;
    const { commentsByPost } = pagination;
    const { postId } = ownProps;

    return {
      entities, postId, commentsByPost,
    };
  };
  const mapDispatchToProps = { loadComments: loadCommentsAction };

  return connect(mapStateToProps, mapDispatchToProps)(CommentsMetaContainer);
}
