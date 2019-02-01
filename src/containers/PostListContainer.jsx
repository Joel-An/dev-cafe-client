import { connect } from 'react-redux';
import React from 'react';

import { loadPosts as loadPostsAction } from '../store/actions/posts';
import { selectPostsMetaByCategory } from '../store/selectors/posts';

export default function withPostListContainer(ComposedComponent) {
  class PostListContainer extends React.Component {
    componentDidMount() {
      const { category, loadPosts } = this.props;

      loadPosts(category);
    }

    componentWillReceiveProps(nextProps) {
      const { categoryId, loadPosts } = this.props;
      if (categoryId !== nextProps.categoryId) {
        loadPosts(nextProps.categoryId);
      }
    }

    render() {
      const newProps = { ...this.props };
      delete newProps.loadPosts;

      return (
        <ComposedComponent {...newProps} />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const { categoryId } = ownProps;
    const postsMeta = selectPostsMetaByCategory(state, categoryId);

    return {
      categoryId, postsMeta,
    };
  };
  const mapDispatchToProps = { loadPosts: loadPostsAction };


  return connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
}
