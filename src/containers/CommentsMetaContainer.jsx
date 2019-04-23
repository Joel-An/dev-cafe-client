import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { commentIdPropType } from './WithComment';
import { postIdPropType } from './PostContainer';

import { loadComments as loadCommentsAction } from '../store/actions/comments';
import { selectCommentsMetaByPost } from '../store/selectors/comments';


export const CommentsMetaContainerPropTypes = {
  commentsMeta: PropTypes.shape({
    isFetchingNewParentComment: PropTypes.bool.isRequired,
    isFetchingComments: PropTypes.bool.isRequired,
    ids: PropTypes.arrayOf(commentIdPropType),
    nextPageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
  postId: postIdPropType.isRequired,
};

export const CommentsMetaContainerDefaultProps = {
  commentsMeta: undefined,
};

export default function withCommentsMetaContainer(ComposedComponent) {
  class CommentsMetaContainer extends React.Component {
    static propTypes = CommentsMetaContainerPropTypes;

    static defaultProps = CommentsMetaContainerDefaultProps;

    componentDidMount() {
      const { postId, loadComments } = this.props;

      loadComments(postId);
    }

    componentDidUpdate(prevProps) {
      const { postId, loadComments } = this.props;
      if (postId !== prevProps.postId) {
        loadComments(postId);
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
