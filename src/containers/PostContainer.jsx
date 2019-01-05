import { connect } from 'react-redux';
import React from 'react';

import { loadPost as loadPostAction } from '../store/actions/posts';

export default function withPostContainer(ComposedComponent) {
  class PostContainer extends React.Component {
    componentDidMount() {
      const { postId, loadPost } = this.props;

      loadPost(postId);
    }

    componentWillReceiveProps(nextProps) {
      const { postId, loadPost } = this.props;
      if (postId !== nextProps.postId) {
        loadPost(nextProps.postId);
      }
    }

    render() {
      const newProps = { ...this.props };
      delete newProps.loadPost;

      return (
        <ComposedComponent {...newProps} />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { id } = ownProps.match.params;

    return {
      entities, postId: id,
    };
  };
  const mapDispatchToProps = { loadPost: loadPostAction };

  return connect(mapStateToProps, mapDispatchToProps)(PostContainer);
}
