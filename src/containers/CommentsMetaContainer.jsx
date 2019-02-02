import { connect } from 'react-redux';
import React from 'react';

import { loadComments as loadCommentsAction } from '../store/actions/comments';
import { selectCommentsMetaByPost } from '../store/selectors/comments';

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
    const { postId } = ownProps;
    const commentsMeta = selectCommentsMetaByPost(state, postId);

    return {
      postId, commentsMeta,
    };
  };
  const mapDispatchToProps = { loadComments: loadCommentsAction };

  return connect(mapStateToProps, mapDispatchToProps)(CommentsMetaContainer);
}
