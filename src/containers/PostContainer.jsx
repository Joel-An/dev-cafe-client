import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { categoryIdPropType } from './WithCategory';
import { userIdPropType } from './WithUser';

import { loadPost as loadPostAction } from '../store/actions/posts';
import { selectPostById } from '../store/selectors/posts';

export default function withPostContainer(ComposedComponent) {
  class PostContainer extends React.Component {
    componentDidMount() {
      const { postId, loadPost } = this.props;

      loadPost(postId);
    }

    componentDidUpdate(prevProps) {
      const { postId, loadPost } = this.props;
      if (postId !== prevProps.postId) {
        loadPost(prevProps);
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
    const { postId } = ownProps;
    const post = selectPostById(state, postId);

    return { post };
  };
  const mapDispatchToProps = { loadPost: loadPostAction };

  return connect(mapStateToProps, mapDispatchToProps)(PostContainer);
}

export const postIdPropType = PropTypes.string;

export const postPropInfo = {
  type: PropTypes.shape({
    _id: postIdPropType.isRequired,
    category: categoryIdPropType.isRequired,
    author: userIdPropType.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    contents: PropTypes.string,
  }),
  default: undefined,
};
