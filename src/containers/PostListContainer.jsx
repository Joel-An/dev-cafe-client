import { connect } from 'react-redux';
import React from 'react';

import { loadPosts as loadPostsAction } from '../store/actions/posts';

export default function withPostListContainer(ComposedComponent) {
  class PostListContainer extends React.Component {
    componentDidMount() {
      const { category, loadPosts } = this.props;

      loadPosts(category);
    }

    componentWillReceiveProps(nextProps) {
      const { category, loadPosts } = this.props;
      if (category !== nextProps.category) {
        loadPosts(nextProps.category);
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

  const getCategoryId = (query) => {
    const categoryId = query.slice(query.indexOf('=') + 1);
    return categoryId;
  };

  const mapStateToProps = (state, ownProps) => {
    const { entities } = state;
    const { postsByCategory } = state.pagination;

    const { search: query } = ownProps.location;
    const category = getCategoryId(query);

    return {
      entities, category, postsByCategory,
    };
  };
  const mapDispatchToProps = { loadPosts: loadPostsAction };


  return connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
}
