import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userIdPropType } from './WithUser';
import { postIdPropType } from './PostContainer';

import { selectCommentById } from '../store/selectors/comments';

const mapStateToProps = (state, ownProps) => {
  const { commentId } = ownProps;
  const comment = selectCommentById(state, commentId);

  return { comment };
};

export default function withComment(Component) {
  return connect(mapStateToProps)(Component);
}

export const commentIdPropType = PropTypes.string;

export const commentPropInfo = {
  type: PropTypes.shape({
    _id: commentIdPropType.isRequired,
    parent: commentIdPropType,
    childComments: PropTypes.arrayOf(commentIdPropType),
    author: userIdPropType,
    post: postIdPropType,
    date: PropTypes.string.isRequired,
    isChild: PropTypes.bool.isRequired,
    isThisModified: PropTypes.bool.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    contents: PropTypes.string.isRequired,
  }),
};
