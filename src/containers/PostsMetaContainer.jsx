import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { postIdPropType } from './PostContainer';
import { categoryIdPropType } from './WithCategory';

import { loadPosts as loadPostsAction } from '../store/actions/posts';
import { updateLastVisitedCategory as updateLastVisitedCategoryAction } from '../store/actions/categories';
import { selectPostsMetaByCategory } from '../store/selectors/posts';


export const PostsMetaContainerPropTypes = {
  postsMeta: PropTypes.shape({
    isFetchingNewPost: PropTypes.bool.isRequired,
    isFetchingPosts: PropTypes.bool.isRequired,
    ids: PropTypes.arrayOf(postIdPropType).isRequired,
    pages: PropTypes.arrayOf(postIdPropType).isRequired,
    nextPageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
  categoryId: categoryIdPropType,
  loadPosts: PropTypes.func,
  updateLastVisitedCategory: PropTypes.func,
};

export const PostsMetaContainerDefaultProps = {
  postsMeta: undefined,
};

export default function withPostsMetaContainer(ComposedComponent) {
  class PostsMetaContainer extends React.Component {
    componentDidMount() {
      const { categoryId, loadPosts, updateLastVisitedCategory } = this.props;

      loadPosts(categoryId);
      updateLastVisitedCategory(categoryId);
    }

    componentDidUpdate(prevProps) {
      const { categoryId, loadPosts, updateLastVisitedCategory } = this.props;
      if (categoryId !== prevProps.categoryId) {
        loadPosts(categoryId);
        updateLastVisitedCategory(categoryId);
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


  return connect(mapStateToProps, mapDispatchToProps)(PostsMetaContainer);
}
