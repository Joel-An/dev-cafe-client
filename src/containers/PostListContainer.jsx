import { connect } from 'react-redux';
import React from 'react';

import { loadPosts as loadPostsAction } from '../store/actions/posts';
import { updateLastVisitedCategory as updateLastVisitedCategoryAction } from '../store/actions/categories';
import { selectPostsMetaByCategory } from '../store/selectors/posts';

export default function withPostListContainer(ComposedComponent) {
  class PostListContainer extends React.Component {
    componentDidMount() {
      const { categoryId, loadPosts, updateLastVisitedCategory } = this.props;

      loadPosts(categoryId);
      updateLastVisitedCategory(categoryId);
    }

    componentWillReceiveProps(nextProps) {
      const { categoryId, loadPosts, updateLastVisitedCategory } = this.props;
      if (categoryId !== nextProps.categoryId) {
        loadPosts(nextProps.categoryId);
        updateLastVisitedCategory(nextProps.categoryId);
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
  const mapDispatchToProps = {
    loadPosts: loadPostsAction,
    updateLastVisitedCategory: updateLastVisitedCategoryAction,
  };


  return connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
}
